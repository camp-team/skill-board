import { ScrapingData } from '../interface/scraping-data';

/**
 * 集計中データ.
 * 加算・計算ロジックを実装するので、interfaceでなくclassとして作成
 */
export class AggregateData {
  public readonly skillId: string;

  // addScrapingDataからしか更新させないので、privateにしてgetterを利用
  private sumRemoteableCount: number = 0;
  private sumPrice: number = 0;
  private dataCount: number = 0;

  constructor(skillId: string) {
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

  public getSumRemoteableCount(): number {
    return this.sumRemoteableCount;
  }
  public getSumPrice(): number {
    return this.sumPrice;
  }

  public getDataCount(): number {
    return this.dataCount;
  }

  /**
   * 平均単価を取得
   */
  public getAveragePrice(): number {
    return Math.floor(this.sumPrice / this.dataCount); // 小数点以下切り捨て
  }
}
