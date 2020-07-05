import { LevtechScraping } from './levtech.scraping';
import { ScrapingResult } from '../scraping-result';
import { ScrapingFirestore } from '../scraping-firestore';

export class LevtechFunction {
  private scraping = new LevtechScraping();
  private firestore = new ScrapingFirestore();

  public async exec(): Promise<ScrapingResult> {
    const result: ScrapingResult = await this.scraping.exec();
    await this.firestore.exec(result);
    return result;
  }
}
