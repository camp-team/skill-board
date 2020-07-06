import { LevtechScraping } from './levtech.scraping';
import { ScrapingResult } from '../../interface/scraping-result';
import { ScrapingFirestore } from '../scraping-firestore';
import * as functions from 'firebase-functions';

const runtimeOpts: functions.RuntimeOptions = {
  timeoutSeconds: 540,
  memory: '2GB',
};

export const scrapingLevtech = functions
  .region('asia-northeast1')
  .runWith(runtimeOpts)
  .https.onRequest(async (req, res) => {
    const result: ScrapingResult = await new LevtechScraping().exec();
    await new ScrapingFirestore().exec(result);
    return res.status(200).json({
      status: 'finished',
      scrapingDataListLenth: result.scrapingDataList.length,
    });
  });
