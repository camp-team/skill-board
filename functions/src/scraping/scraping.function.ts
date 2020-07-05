import * as functions from 'firebase-functions';
import { LevtechFunction } from './levtech/levtech.function';
import { ScrapingResult } from './scraping-result';

const runtimeOpts: functions.RuntimeOptions = {
  timeoutSeconds: 540,
  memory: '2GB',
};

export const scrapingFunction = functions
  .region('asia-northeast1')
  .runWith(runtimeOpts)
  .https.onRequest(async (req, res) => {
    const s: number = new Date().getMilliseconds();
    const result: ScrapingResult = await new LevtechFunction().exec();
    const e: number = new Date().getMilliseconds();
    // TODO 他のスクレイピング対象も随時追加
    // TODO 集計処理
    // console.log('execTime:' + (e - s) + 'ms');
    console.log('scrapingDataListLenth:' + result.scrapingDataList.length);
    return res.status(200).json({
      status: 'finished',
      execTime: e - s,
      scrapingDataListLenth: result.scrapingDataList.length,
    });
  });
