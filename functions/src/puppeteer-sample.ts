import * as functions from 'firebase-functions';
import * as puppeteer from 'puppeteer';

const runtimeOpts: functions.RuntimeOptions = {
  timeoutSeconds: 300,
  memory: '1GB',
};

export const puppeteerSample = functions
  .region('asia-northeast1')
  .runWith(runtimeOpts)
  .https.onRequest(async (req, res) => {
    try {
      const start: number = Date.now();
      const browser: puppeteer.Browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox'],
      });
      const page: puppeteer.Page = await browser.newPage();
      const url = 'https://levtech.jp/';
      await page.goto(url);
      const title = await page.title();
      await browser.close();
      const end: number = Date.now();
      const executionTime = end - start;
      return res.status(200).json({
        status: 'finished',
        title: title,
        executionTime: executionTime + 'ms',
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ status: 'error', error: e });
    }
  });
