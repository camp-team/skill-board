import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { ScrapingContext } from './scraping.context';

export class ScrapingFirestore {
  private db: admin.firestore.Firestore;

  constructor() {
    admin.initializeApp();
    this.db = admin.firestore();
  }

  public async exec(context: ScrapingContext) {
    console.log('ScrapingFirestore.exec.start');

    const collectionPath = context.getCollectionPath();
    const dataList = context.getDataList();

    // 同一日付&サイトのスクレイピングデータがあれば全削除.
    // (同一サイトに対して、1日複数回スクレイピングを実行した場合、最新のデータのみ残す)
    await this.deleteAllByCollectionPath(collectionPath);

    // スクレイピングデータ
    await Promise.all(
      dataList.map(async (d) => {
        const doc = await this.db.collection(collectionPath).add(d);
        d.objectID = doc.id; // firestore内で採番されたIDをセット(alogliaで使う)
      })
    );

    // スクレイピングデータヘッダー
    await this.db
      .collection('scraping-data-header')
      .add(context.getDataHeader());

    console.log('ScrapingFirestore.exec.end');
  }

  /**
   * firebase CLIのコマンドを使って、該当のコレクションを全削除.
   * 通常のfirestore操作だと、一度全データ取得し、再起的にdelete処理をする必要がある。
   * 参考: https://firebase.google.com/docs/firestore/manage-data/delete-data?hl=ja#collections
   * @param collectionPath
   */
  private async deleteAllByCollectionPath(collectionPath: string) {
    console.log('ScrapingFirestore.deleteAllByCollectionPath.start');
    const firebase_tools = require('firebase-tools');
    await firebase_tools.firestore.delete(collectionPath, {
      project: process.env.GCLOUD_PROJECT,
      recursive: true,
      yes: true,
      token: functions.config().fb.token,
    });
    console.log('ScrapingFirestore.deleteAllByCollectionPath.end');
  }
}
