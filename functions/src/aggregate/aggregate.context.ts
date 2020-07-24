import { ScrapingData } from '../interface/scraping-data';
import { AggregateData } from './aggregate.data';
import { Skill } from '../interface/skill';

// 一連のスクレイピング処理を通して、管理が必要な情報等を本クラスで一元管理。
export class AggregateContext {
  // 集計データのmap<skillId, 集計データ>
  public readonly aggregateDataMap = new Map<string, AggregateData>();

  // 集計データを反映したskillデータ
  public readonly skills: Skill[] = [];

  public readonly aggregateDate: number;

  constructor() {
    const d = new Date();
    this.aggregateDate =
      d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
  }

  public addScrapingData(scrapingData: ScrapingData) {
    if (scrapingData.skillIds) {
      for (const skillId of scrapingData.skillIds) {
        this.getAggregateData(skillId).addScrapingData(scrapingData);
      }
    }
  }

  /**
   * skillIdに対応したAggregateDataを取得.
   * @param skillId
   */
  public getAggregateData(skillId: string): AggregateData {
    let data = this.aggregateDataMap.get(skillId);
    if (!data) {
      // mapになかった場合、新たに作成してmapにセット
      data = new AggregateData(skillId);
      this.aggregateDataMap.set(skillId, data);
    }
    return data;
  }
}
