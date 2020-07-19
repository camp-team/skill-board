import { ScrapingData } from '../interface/scraping-data';
import { AggregateData } from './aggregate.data';

// 一連のスクレイピング処理を通して、管理が必要な情報等を本クラスで一元管理。
export class AggregateContext {
  // 最小実行モード有無.
  // 通常のスクレイピング処理だと時間がかかってしまうので、少ない件数だけ素早く実行するためのモード
  // 開発時の検証を効率化するために利用。(本番では利用しない)
  private minimumMode: boolean;

  constructor(minimumMode?: number) {
    this.minimumMode = !!minimumMode;
  }

  /**
   * 最小実行モードか？
   */
  public isMinimumMode(): boolean {
    return this.minimumMode;
  }

  public setScrapingData(scrapingData: ScrapingData) {
    if (scrapingData.skillIds) {
      for (const skillId of scrapingData.skillIds) {
        this.aggregateDataMap.set(
          skillId,
          this.getAggregateData(skillId).addScrapingData(scrapingData)
        );
      }
    }
    console.log('setScrapingData.mapSize:' + this.aggregateDataMap.size);
  }

  private aggregateDataMap = new Map<string, AggregateData>();

  public getAggregateData(skillId: string) {
    let data = this.aggregateDataMap.get(skillId);
    if (!data) {
      data = new AggregateData(skillId);
    }
    return data;
  }

  public getDataMap(): Map<string, AggregateData> {
    return this.aggregateDataMap;
  }
}
