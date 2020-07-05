import * as admin from 'firebase-admin';
import { ScrapingResult } from './scraping-result';

export class ScrapingFirestore {
  private db: admin.firestore.Firestore;

  constructor() {
    admin.initializeApp();
    this.db = admin.firestore();
  }

  public async exec(result: ScrapingResult) {
    console.log('ScrapingFirestore.exec.start');
    const collectionPath = this.makeCollectionPath(result);

    // let i: number = 1;
    // let batch = this.db.batch();

    // for (const data of result.scrapingDataList) {
    //   const id = i++;
    //   const doc = this.db.collection(collectionPath).doc(id + '');
    //   batch.set(doc, data);
    //   if (i % 500 === 0) {
    //     console.log('batch.commit.start');
    //     await batch.commit();
    //     batch = this.db.batch();
    //     console.log('batch.commit.end');
    //   }
    // }

    // if (i % 500 > 0) {
    //   console.log('batch.commit.start');
    //   await batch.commit();
    //   console.log('batch.commit.end');
    // }

    await Promise.all(
      result.scrapingDataList.map(
        async (d) => await this.db.collection(collectionPath).add(d)
      )
    );

    // result.scrapingDataList.forEach(async (d) => {
    //   await this.db.collection(collectionPath).add(d);
    // });

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
