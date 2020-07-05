import * as functions from 'firebase-functions';
import { AlgoliaClinent } from './algolia-client';

// firebaseではスクレイピング対象&実行日でパスを分けていたが、
// Algoliaはまとめて登録
const algoliaClient = new AlgoliaClinent('scraping-data');

export const scrapingDataCreate = functions
  .region('asia-northeast1')
  .firestore.document('scraping-data/{scrapingTarget}/{scrapingAt}/{id}')
  .onCreate(async (snap, context) => {
    return algoliaClient.saveIndex(snap.id, snap.data());
  });

export const scrapingDataUpdate = functions
  .region('asia-northeast1')
  .firestore.document('scraping-data/{scrapingTarget}/{scrapingAt}/{id}')
  .onUpdate(async (snap, context) => {
    return algoliaClient.saveIndex(snap.after.id, snap.after.data());
  });

export const scrapingDataDelete = functions
  .region('asia-northeast1')
  .firestore.document('scraping-data/{scrapingTarget}/{scrapingAt}/{id}')
  .onDelete(async (snap, context) => {
    return algoliaClient.deleteIndex(snap.id);
  });
