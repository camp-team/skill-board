import { ScrapingData } from '../interface/scraping-data';

/**
 * 集計データ
 */
export class AggregateData {
  skillId: string;
  sumRemoteableCount: number = 0;
  sumPrice: number = 0;
  dataCount: number = 0;

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
      return this;
      // throw new Error('skillIdが一致しません'); // skillIdが一致しない場合、エラーとする
    }

    console.log('AggregateData.addScrapingData');
    if (scrapingData.remoteable) this.sumRemoteableCount++;
    this.sumPrice = this.sumPrice + scrapingData.price;
    this.dataCount++;
    return this;
  }
}
