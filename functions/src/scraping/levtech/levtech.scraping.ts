import * as puppeteer from 'puppeteer';
import { ScrapingData } from '../../interface/scraping-data';
import { LevtechDataConverter } from './levtech.data-converter';
import { ScrapingContext } from '../scraping.context';

interface PageResult {
  next: boolean;
  dataList: ScrapingData[];
}

export class LevtechScraping {
  private dataConverter = new LevtechDataConverter();

  public async exec(context: ScrapingContext): Promise<ScrapingContext> {
    console.log('LevtechScraping.exec.start');
    const dataList = await this.doScraping(context);
    context.setDataList(this.dataConverter.exec(dataList));
    console.log('LevtechScraping.exec.end');
    return context;
  }

  private async doScraping(context: ScrapingContext): Promise<ScrapingData[]> {
    const browser: puppeteer.Browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox'],
    });
    const page: puppeteer.Page = await browser.newPage();
    const url = 'https://freelance.levtech.jp/project/search/';
    await page.goto(url);

    let scrapingDataList: ScrapingData[] = [];
    let next = true;
    while (next) {
      const pageResult = await page.evaluate(this.evaluatePage);
      next = pageResult.next && !context.isMinimumMode(); // 最小実行モードの場合、結果問わず1ページ目で終了
      scrapingDataList = scrapingDataList.concat(pageResult.dataList);
      if (next) {
        const nextButton = await page.$('span.next > a');
        if (nextButton) {
          await nextButton.click();
          await page.waitForNavigation({
            waitUntil: 'domcontentloaded',
          });
        } else {
          next = false;
        }
      }
    }

    await page.close();
    await browser.close();

    return scrapingDataList;
  }

  private evaluatePage(): PageResult {
    const result: PageResult = {
      next: true,
      dataList: [],
    };

    document.querySelectorAll('ul.prjList > li').forEach((prj) => {
      if (prj.querySelector('p.prjList__item__banner')) {
        return; // バナー行はスキップ
      }

      const headTtlLabel = prj.querySelector('span.prjHead__ttl__label');
      if (headTtlLabel && headTtlLabel.innerHTML.match(/募集終了/)) {
        result.next = false; // 募集終了の案件が出てきたら、次以降のページは処理をしないで終了する
        return;
      }

      const prjHtml = prj.innerHTML;
      const remoteable: boolean =
        !!prjHtml.match(/リモート/) || !!prjHtml.match(/テレワーク/);
      // 厳密ではないが、リモート関連のワードが含まれていたら、リモート対象とみなす。
      // (レバテックは、リモート有無を項目として管理していない)

      const prjHead = prj.querySelector('.prjHead__ttl > .js-link_rel');
      const prjUrl = prjHead ? prjHead.getAttribute('href') + '' : '';
      // 案件詳細ページへのリンク
      // 現状利用用途はないが、これによって案件の特定ができるので、保持しておく。
      // (最後の数値は、恐らくレバテック内の案件ID)

      const priceAreaElm = prj.querySelector('.prjContent__summary__price');
      const priceText = priceAreaElm
        ? priceAreaElm.querySelector('span')?.innerHTML + ''
        : '';
      let price: number = Number(priceText.replace(/円|,/g, ''));
      if (priceAreaElm?.innerHTML.match(/／時/)) {
        price = price * 160; // 時給の場合は、月額に換算
      }

      const contractElm = prj.querySelector('.prjContent__summary__contract');
      let contract = contractElm ? contractElm.innerHTML : '';
      contract = contract.replace(/\n|（フリーランス）|\s/g, ''); // 不要な文字列をトリミング

      let prefectures = '';
      let station = '';
      const skills: string[] = [];

      prj
        .querySelectorAll('ul.prjTable > li.prjTable__item')
        .forEach((item) => {
          const ttlElm = item.querySelector('p.prjTable__item__ttl');
          const ttl = ttlElm ? ttlElm.innerHTML : '';
          switch (ttl) {
            case '最寄り駅':
              const locationElm = item.querySelector('p.prjTable__item__desc');
              const location = locationElm ? locationElm.innerHTML : '';
              if (location.includes('（')) {
                // [新宿（東京都）]の形式になっているので、駅名と都道府県に分割
                const split = location.split('（');
                station = split[0];
                prefectures = split[1].replace(')', '');
              }
              break;

            case '開発環境':
              item
                .querySelectorAll('p.prjTable__item__desc > a.tagLink')
                .forEach((tag) => {
                  skills.push(tag.innerHTML);
                });
              break;
          }
        });

      // レバテック内で、Tag化されていないスキルはHTML検索してカウント
      const nonTagSkills = [
        { name: 'typeScript', regExp: new RegExp(/typeScript/, 'i') },
        { name: 'vue', regExp: new RegExp(/vue/, 'i') },
      ];
      nonTagSkills.forEach((nonTagSkill) => {
        if (prjHtml.match(nonTagSkill.regExp)) {
          skills.push(nonTagSkill.name);
        }
      });

      const data: ScrapingData = {
        url: prjUrl,
        price: price,
        contract: contract,
        prefectures: prefectures,
        station: station,
        skills: skills,
        remoteable: remoteable,
      };
      result.dataList.push(data);
    });
    return result;
  }
}
