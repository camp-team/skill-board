import * as functions from 'firebase-functions';
import { AlgoliaClinent } from './algolia-client';

const algoliaClient = new AlgoliaClinent('skills');

export const skillCreate = functions
  .region('asia-northeast1')
  .firestore.document('skills/{id}')
  .onCreate(async (snap, context) => {
    return algoliaClient.saveIndex(snap.id, snap.data());
  });

export const skillUpdate = functions
  .region('asia-northeast1')
  .firestore.document('skills/{id}')
  .onUpdate(async (snap, context) => {
    return algoliaClient.saveIndex(snap.after.id, snap.after.data());
  });

export const skillDelete = functions
  .region('asia-northeast1')
  .firestore.document('skills/{id}')
  .onDelete(async (snap, context) => {
    return algoliaClient.deleteIndex(snap.id);
  });
