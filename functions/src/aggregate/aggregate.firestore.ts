import * as admin from 'firebase-admin';
import { AggregateContext } from './aggregate.context';

export class AggregateFirestore {
  private db: admin.firestore.Firestore;

  constructor() {
    admin.initializeApp();
    this.db = admin.firestore();
  }

  public async exec(context: AggregateContext) {
    console.log('AggregateFirestore.exec.star');

    // const dataIterater = context.getDataMap().values();

    const skillsRef = this.db.collection('skills');
    console.log('skillsRef');

    // const skillDocRefs = await skillsRef.listDocuments();
    // for (const skillDocRef of skillDocRefs) {
    //   const skillData = (await skillDocRef.get()).data();
    //   console.log('skillData:' + JSON.stringify(skillData));
    // }

    const snapShot = await skillsRef.get();
    console.log('snapShot:' + snapShot.size);

    const skills = snapShot.docs.map((doc) => {
      return doc.data();
    });

    for (const skill of skills) {
      console.log('skill:' + JSON.stringify(skill));
    }

    // for (const data of dataArray) {
    //   console.log('data');
    //   console.log(JSON.stringify(data));
    // }

    // await this.db
    //   .collection('skills')
    //   .get()
    //   .then((snapshot) => {
    //     snapshot.forEach((doc) => {
    //       console.log(doc.id, '=>', doc.data());
    //     });
    //   })
    //   .catch((err) => {
    //     console.log('Error getting documents', err);
    //   });

    // // 同一日付&サイトのスクレイピングデータがあれば全削除.
    // // (同一サイトに対して、1日複数回スクレイピングを実行した場合、最新のデータのみ残す)
    // await this.deleteAllByCollectionPath(collectionPath);

    // // スクレイピングデータ
    // await Promise.all(
    //   dataList.map(async (d) => {
    //     const doc = await this.db.collection(collectionPath).add(d);
    //     d.objectID = doc.id; // firestore内で採番されたIDをセット(alogliaで使う)
    //   })
    // );

    // // スクレイピングデータヘッダー
    // await this.db
    //   .collection('scraping-data-header')
    //   .add(context.getDataHeader());

    console.log('AggregateFirestore.exec.end');
  }
}
