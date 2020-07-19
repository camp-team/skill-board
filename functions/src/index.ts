// import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// 追加or更新したらで以下デプロイ
// firebase deploy --only functions
export { skillCreate } from './firestore/skill.function';
export { skillUpdate } from './firestore/skill.function';
export { skillDelete } from './firestore/skill.function';
export { scrapingLevtech } from './scraping/scraping.function';
export { aggregateScrapingData } from './aggregate/aggregate.function';
