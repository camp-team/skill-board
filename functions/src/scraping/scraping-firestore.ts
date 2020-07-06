import * as admin from 'firebase-admin';
import { ScrapingResult } from '../interface/scraping-result';
import { ScrapingLog } from '../interface/scraping-log';

export class ScrapingFirestore {
  private db: admin.firestore.Firestore;

  constructor() {
    admin.initializeApp();
    this.db = admin.firestore();
  }

  public async exec(result: ScrapingResult) {
    console.log('ScrapingFirestore.exec.start');

    // スクレイピングデータ
    const collectionPath = this.makeCollectionPath(result);
    await Promise.all(
      result.scrapingDataList.map(async (d) => {
        d.scrapingAt = result.scrapingAt;
        d.scrapingTarget = result.scrapingTarget;
        await this.db.collection(collectionPath).add(d);
      })
    );

    // スクレイピング実行ログ
    const scrapingLog: ScrapingLog = {
      scrapingAt: result.scrapingAt,
      scrapingTarget: result.scrapingTarget,
      scrapingDataLength: result.scrapingDataList.length,
    };
    await this.db.collection('scraping-log').add(scrapingLog);

    console.log('ScrapingFirestore.exec.end');
  }

  private makeCollectionPath(result: ScrapingResult): string {
    const scrapingDate = result.scrapingAt.toDate();

    const scrapingDateNum: number =
      scrapingDate.getFullYear() * 10000 +
      (scrapingDate.getMonth() + 1) * 100 +
      scrapingDate.getDate();

    return 'scraping-data/' + result.scrapingTarget + '/' + scrapingDateNum;
  }
}
