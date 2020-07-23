import * as admin from 'firebase-admin';

admin.initializeApp();

// 追加or更新したらで以下デプロイ
// firebase deploy --only functions
export { skillCreate } from './firestore/skill.function';
export { skillUpdate } from './firestore/skill.function';
export { skillDelete } from './firestore/skill.function';
export { scrapingLevtech } from './scraping/scraping.function';
export { aggregateScrapingData } from './aggregate/aggregate.function';
