import * as puppeteer from 'puppeteer';
import { ScrapingData } from '../scraping-data';
import { ScrapingResult } from '../scraping-result';
import { LevtechDataConverter } from './levtech.data-converter';
import { firestore } from 'firebase-admin';

interface PageResult {
  next: boolean;
  dataList: ScrapingData[];
}

export class LevtechScraping {
  private dataConverter = new LevtechDataConverter();

  public async exec(): Promise<ScrapingResult> {
    const start: number = Date.now();
    // console.log('LevtechScraping.exec.start:' + start);
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
      console.debug('LevtechScraping.page-next');
      const pageResult = await page.evaluate(this.evaluatePage);
      next = pageResult.next;
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

    const end: number = Date.now();
    const executionTime = end - start;
    // console.log('LevtechScraping.exec.end:' + executionTime);

    return {
      scrapingAt: firestore.Timestamp.now(),
      scrapingTarget: 'levtech',
      status: 'success',
      executionTime: executionTime,
      scrapingDataList: this.dataConverter.exec(scrapingDataList),
    };
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

      const priceAreaElm = prj.querySelector('.prjContent__summary__price');
      const priceElm = priceAreaElm ? priceAreaElm.querySelector('span') : null;
      const priceText = priceElm ? priceElm.innerHTML : '';
      let price: number = Number(priceText.replace(/円|,/g, ''));
      if (priceAreaElm?.innerHTML.match(/／時/)) {
        price = price * 160; // 時給の場合は、月額に換算
      }

      const contractElm = prj.querySelector('.prjContent__summary__contract');
      let contract = contractElm ? contractElm.innerHTML : '';
      contract = contract.replace(/\n|（フリーランス）|\s/g, ''); // 不要な文字列をトリミング

      let location = '';
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
              location = locationElm ? locationElm.innerHTML : '';
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

      const data: ScrapingData = {
        price: price,
        contract: contract,
        prefectures: prefectures,
        station: station,
        skills: skills,
      };
      result.dataList.push(data);
    });
    return result;
  }
}

// [単体実行コマンド]npx ts-node src/scraping/levtech/levtech.scraping.ts
// tslint:disable-next-line: no-floating-promises
// new LevtechScraping().exec().then((r) => {
//   r.scrapingDataList.forEach((d) => console.log(d));
//   console.log('executionTime:' + r.executionTime);
// });
