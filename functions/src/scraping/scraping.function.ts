import { LevtechScraping } from './levtech/levtech.scraping';
import { ScrapingFirestore } from './scraping.firestore';
import * as functions from 'firebase-functions';
import { ScrapingContext } from './scraping.context';
import { ScrapingAlgolia } from './scraping.algolia';

const runtimeOpts: functions.RuntimeOptions = {
  timeoutSeconds: 540,
  memory: '2GB',
};

// スクレピング対象が追加された場合、ここに足していく。

export const scrapingLevtech = functions
  .region('asia-northeast1')
  .runWith(runtimeOpts)
  .https.onRequest(async (req, res) => {
    const context = new ScrapingContext('levtech');
    await new LevtechScraping().exec(context);
    await new ScrapingFirestore().exec(context);
    await new ScrapingAlgolia().exec(context); // firestoreで採番されたIDを使うので、firestore保存後に実行
    // TODO 途中でエラーが発生した場合の挙動(例えば、firestore成功後、algoliaでエラー出たらどうする？)
    return res.status(200).json(context.getDataHeader());
  });
