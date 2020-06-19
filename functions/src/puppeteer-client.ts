import * as functions from 'firebase-functions';
import { Page, Browser, launch } from 'puppeteer';

export const puppeteerExcute = functions
  .region('asia-northeast1')
  .https.onCall((data, context) => {
    const ret = async () => new PuppeteerClinent().puppeteerTest();
    return { sts: ret };
  });

export class PuppeteerClinent {
  async puppeteerTest() {
    console.log('puppeteerTest');
    const browser: Browser = await launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    console.log('launch');
    const page: Page = await browser.newPage();
    console.log('browser.newPage');
    const url = 'https://levtech.jp/';
    await page.goto(url);
    console.log('page.goto');
    const title = await page.title();
    console.log(title);
    await browser.close();
    console.log('browser.close');
    return 'success';
  }
}
