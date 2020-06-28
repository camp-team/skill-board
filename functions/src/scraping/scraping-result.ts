import { ScrapingData } from './scraping-data';
import { firestore } from 'firebase-admin';

export interface ScrapingResult {
  scrapingAt: firestore.Timestamp;
  scrapingTarget: string;
  status: 'success' | 'error';
  executionTime: number;
  scrapingDataList: ScrapingData[];
}
