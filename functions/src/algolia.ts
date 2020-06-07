import * as functions from 'firebase-functions';
import algoliasearch from 'algoliasearch';

// Algoliaを使えるようにする
const ALGOLIA_ID = functions.config().algolia.app_id;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.secret_key;
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);

// 記事のインデックスを定義
const index = client.initIndex('skills');

// レコードを分割して追加する処理
const addRecords = (item: any) => {
  const records = item.body
    .match(/[\s\S]{1,500}/gm)
    .map((body: any, i: number) => {
      return {
        ...item,
        objectID: item.id + '-' + i,
        body,
      };
    });

  return Promise.all(records.map((record: any) => index.saveObject(record)));
};

// レコード追加する処理
export const addIndex = (data: any) => {
  console.log('ALGOLIA_ID:' + ALGOLIA_ID);
  console.log('ALGOLIA_ADMIN_KEY:' + ALGOLIA_ADMIN_KEY);

  const item = data;

  console.log('data:' + data);

  // algoliaに追加するレコードのIDをドキュメントに含まれるIDと同じにする
  item.objectID = data.id;

  item.aggregationDate = item.aggregationDate.toMillis(); // firestoreのタイムスタンプ型をミリ秒に変換
  item.updatedAt = item.updatedAt.toMillis(); // firestoreのタイムスタンプ型をミリ秒に変換
  item.createdAt = item.createdAt.toMillis(); // firestoreのタイムスタンプ型をミリ秒に変換

  if (item.body && item.body.length > 500) {
    return addRecords(item); // 本文の文字数が多い場合、分割してレコードに追加する
  } else {
    console.log('saveObject:' + item);
    return index.saveObject(item); // 文字数が多くない場合、単体レコードとして追加する
  }
};
