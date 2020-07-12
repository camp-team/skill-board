import * as admin from 'firebase-admin';
import { ScrapingContext } from './scraping.context';

export class ScrapingFirestore {
  private db: admin.firestore.Firestore;

  constructor() {
    admin.initializeApp();
    this.db = admin.firestore();
  }

  public async exec(context: ScrapingContext) {
    console.log('ScrapingFirestore.exec.start');

    // スクレイピングデータ
    const collectionPath = context.getCollectionPath();
    const dataList = context.getDataList();
    await Promise.all(
      dataList.map(async (d) => {
        await this.db.collection(collectionPath).add(d);
      })
    );

    // スクレイピングデータヘッダー
    await this.db
      .collection('scraping-data-header')
      .add(context.getDataHeader());

    console.log('ScrapingFirestore.exec.end');
  }
}
