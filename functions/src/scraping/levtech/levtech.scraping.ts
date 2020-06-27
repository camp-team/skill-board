import * as puppeteer from 'puppeteer';
import { ScrapingData } from './scraping-data';

interface PageResult {
  next: boolean;
  dataList: ScrapingData[];
}

export async function scrapingExecute() {
  const start: number = Date.now();
  const browser: puppeteer.Browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox'],
  });
  console.log('lunch');
  const page: puppeteer.Page = await browser.newPage();
  console.log('newPage');
  const url = 'https://freelance.levtech.jp/project/search/';
  await page.goto(url);
  console.log('goto');

  let scrapingDataList: ScrapingData[] = [];
  let next = true;
  while (next) {
    const pageResult = await scrapingPage(page);
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

  await browser.close();
  const end: number = Date.now();
  const executionTime = end - start;
  return {
    status: 'success',
    executionTime: executionTime,
    scrapingDataCount: scrapingDataList.length,
    scrapingDataList: JSON.stringify(scrapingDataList),
  };
}

async function scrapingPage(page: puppeteer.Page): Promise<PageResult> {
  return page.evaluate(() => {
    const result: PageResult = {
      next: true,
      dataList: [],
    };
    let i = 0;
    document.querySelectorAll('ul.prjList > li').forEach((prj) => {
      const count = i++; // for Debug

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
      let price: number = Number(priceText.replace('円', '').replace(',', ''));

      if (priceAreaElm?.innerHTML.match(/／時/)) {
        price = price * 160; // 時給の場合は、月額に換算
      }

      const contract = prj.querySelector('.prjContent__summary__contract');

      let location: string | null = null;
      const categories: string[] = [];
      prj
        .querySelectorAll('ul.prjTable > li.prjTable__item')
        .forEach((item) => {
          const ttlElm = item.querySelector('p.prjTable__item__ttl');
          const ttl = ttlElm ? ttlElm.innerHTML : '';
          switch (ttl) {
            case '最寄り駅':
              const locationElm = item.querySelector('p.prjTable__item__desc');
              location = locationElm ? locationElm.innerHTML : '';
              break;
            case '開発環境':
              item
                .querySelectorAll('p.prjTable__item__desc > a.tagLink')
                .forEach((tag) => {
                  categories.push(tag.innerHTML);
                });
              break;
          }
        });

      const data: ScrapingData = {
        count: count,
        price: price,
        contract: contract ? contract.innerHTML : '',
        location: location ? location : '',
        skillCateries: categories,
      };
      result.dataList.push(data);
    });
    return result;
  });
}

// tslint:disable-next-line: no-floating-promises
scrapingExecute().then((r) => console.log(r));
