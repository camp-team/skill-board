import * as admin from 'firebase-admin';
import { AggregateContext } from './aggregate.context';
import { Skill } from '@interfaces/skill';

export class AggregateFirestore {
  private db: admin.firestore.Firestore;

  constructor() {
    admin.initializeApp();
    this.db = admin.firestore();
  }

  public async exec(context: AggregateContext) {
    console.log('AggregateFirestore.exec.start');

    // const dataIterater = context.getDataMap().values();

    const skills = await (await this.db.collection('skills').get()).docs.map(
      (doc) => (doc.data as unknown) as Skill
    );

    skills.forEach((skill) => console.log(JSON.stringify(skill)));

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
