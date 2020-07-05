import { firestore } from 'firebase-admin';

export interface ScrapingLog {
  scrapingAt: firestore.Timestamp;
  scrapingTarget: string;
  scrapingDataLength: number;
}
