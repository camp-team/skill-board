import { firestore } from 'firebase-admin';

export interface ScrapingDataHeader {
  scrapingAt: firestore.Timestamp;
  scrapingDate?: number; //YYYYMMDD形式の8桁数値
  scrapingTarget: string;
  scrapingDataLength: number;
}
