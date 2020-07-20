import { ScrapingData } from '../interface/scraping-data';

/**
 * 集計データ
 */
export class AggregateData {
  public skillId: string;
  public sumRemoteableCount: number = 0;
  public sumPrice: number = 0;
  public dataCount: number = 0;
  public price: number = 0;

  constructor(skillId: string) {
    console.log('AggregateData.' + skillId);
    this.skillId = skillId;
  }

  /**
   * スクレイピングデータの値を加算.
   * @param scrapingData
   */
  public addScrapingData(scrapingData: ScrapingData): AggregateData {
    if (
      !scrapingData.skillIds ||
      !scrapingData.skillIds.includes(this.skillId)
    ) {
      return this; // skillIdが一致しない場合、何もせず返す
    }

    if (scrapingData.remoteable) this.sumRemoteableCount++;
    this.sumPrice = this.sumPrice + scrapingData.price;
    this.dataCount++;
    return this;
  }

  public calcAveragePrice(): number {
    this.price = Math.floor(this.sumPrice / this.dataCount);
    return this.price;
  }
}
