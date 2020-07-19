import * as functions from 'firebase-functions';
import * as algolia from 'algoliasearch';
import { firestore } from 'firebase-admin';

// Algoliaを使えるようにする
const ALGOLIA_ID = functions.config().algolia.app_id;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.secret_key;
const client = algolia.default(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);

export class AlgoliaClinent {
  private index: algolia.SearchIndex;

  constructor(indexName: string) {
    this.index = client.initIndex(indexName);
  }

  deleteObject(id: string) {
    return this.index.deleteObject(id);
  }

  saveObject(id: string, fsData: any) {
    const agData = fsData;
    agData.objectID = id;

    // firestoreのタイムスタンプ型項目をミリ秒に変換
    for (const k of Object.keys(agData)) {
      if (agData[k] instanceof firestore.Timestamp) {
        agData[k] = agData[k].toMillis();
      }
    }

    // 文字数オーバーが発生する項目が追加された場合、Distinct対応&分割登録の処理が必要
    return this.index.saveObject(agData);
  }

  getIndex() {
    return this.index;
  }
}
