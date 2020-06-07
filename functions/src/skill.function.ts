import * as functions from 'firebase-functions';
import { addIndex } from './algolia'; // 上記の関数をインポート

// export const createSkills = functions.firestore
//   .document('skills/{id}')
//   .onCreate(async (snap, context) => {
//     return addIndex(snap.data()); // 上記で定義した関数を使っている
//   });

// export const updateSkills = functions.firestore
//   .document('skills/{id}')
//   .onUpdate(async (snap, context) => {
//     return addIndex(snap.after.data()); // 上記で定義した関数を使っている
//   });

export const onWritesSkills = functions.firestore
  .document('skills/{id}')
  .onWrite(async (snap, context) => {
    console.log('eventType:' + context.eventType);
    console.log('before:' + (snap.before == null) ? 'null' : snap.before.id);
    console.log('after:' + (snap.after == null) ? 'null' : snap.after.id);
    return addIndex(snap.after.data()); // 上記で定義した関数を使っている
  });
