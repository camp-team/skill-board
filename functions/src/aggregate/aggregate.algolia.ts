import { AlgoliaClinent } from '../algolia/algolia.client';
import { AggregateContext } from './aggregate.context';
import { ScrapingData } from '../interface/scraping-data';

export class AggregateAlgolia {
  /**
   * 任意のサイトの最新スクレイピングデータを取得
   * @param context
   * @param scrapingTarget
   */
  public async loadScrapingData(
    context: AggregateContext,
    scrapingTarget: string
  ) {
    console.log('AggregateAlgolia.exec.start', scrapingTarget);

    // index名からclientを生成(index名はスクレイピング対象ごとに決まる)
    const algoliaClient = new AlgoliaClinent('scraping-data-' + scrapingTarget);

    const searchOptions = { page: 0 };

    let nextPage = true; // 1リクエストでのデータ取得数制限があるので、ページング判定してループ処理
    let dataCount = 0;
    while (nextPage) {
      const response = await algoliaClient
        .getIndex()
        .search<ScrapingData>('', searchOptions);
      for (const scrapingData of response.hits) {
        context.addScrapingData(scrapingData);
      }
      nextPage = response.nbPages >= response.page + 1;
      searchOptions.page = searchOptions.page + 1;
      if (!dataCount) dataCount = response.nbHits; //log出力用
    }

    console.log(
      'AggregateAlgolia.exec.end',
      scrapingTarget,
      'dataCount:' + dataCount
    );
  }
}
