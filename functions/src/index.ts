// import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// 追加or更新したらで以下デプロイ
// firebase deploy --only functions
export { createSkill } from './skill.function';
export { updateSkill } from './skill.function';
export { deleteSkill } from './skill.function';
export { puppeteerExcute } from './puppeteer-client';
