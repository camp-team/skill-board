import { ScrapingDataHeader } from '../interface/scraping-data-header';
import { ScrapingData } from '../interface/scraping-data';
import { firestore } from 'firebase-admin';

// 一連のスクレイピング処理を通して、管理が必要な情報等を本クラスで一元管理。
export class ScrapingContext {
  private dataHeader: ScrapingDataHeader;
  private dataList: ScrapingData[] = [];

  constructor(scrapingTarget: string) {
    this.dataHeader = this.createDataHeader(scrapingTarget);
  }

  private createDataHeader(scrapingTarget: string): ScrapingDataHeader {
    const scrapingAt = firestore.Timestamp.now();

    const d = scrapingAt.toDate();
    const scrapingDate: number =
      d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();

    return {
      scrapingAt: scrapingAt,
      scrapingDate: scrapingDate,
      scrapingTarget: scrapingTarget,
      scrapingDataLength: 0,
    };
  }

  public getDataHeader(): ScrapingDataHeader {
    return this.dataHeader;
  }

  public setDataList(dataList: ScrapingData[]) {
    this.dataList = dataList;
    this.dataList.forEach((d) => {
      d.scrapingDate = this.dataHeader.scrapingDate;
      d.scrapingTarget = this.dataHeader.scrapingTarget;
    });
    this.dataHeader.scrapingDataLength = dataList.length;
  }

  public getDataList(): ScrapingData[] {
    return this.dataList;
  }

  // firebase保存先のpath
  public getCollectionPath(): string {
    return (
      'scraping-data/' +
      this.dataHeader.scrapingTarget +
      '/' +
      this.dataHeader.scrapingDate
    );
  }

  // algolia保存先のindex名
  // (最新データのみ保持するので、dateは不要)
  public getAlgoliaIndexName(): string {
    return 'scraping-data-' + this.dataHeader.scrapingTarget;
  }
}
