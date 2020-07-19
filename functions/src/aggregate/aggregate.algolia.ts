import { AlgoliaClinent } from '../algolia/algolia.client';
import { AggregateContext } from './aggregate.context';
import { ScrapingData } from '../interface/scraping-data';

export class AggregateAlgolia {
  public async exec(context: AggregateContext, scrapingTarget: string) {
    console.log('AggregateAlgolia.exec.start');

    // index名からclientを生成(index名はスクレイピング対象ごとに決まる)
    const algoliaClient = new AlgoliaClinent('scraping-data-' + scrapingTarget);

    const opt = {
      page: 1,
      hitsPerPage: 500,
    };

    // let nextPage = true;
    // while (nextPage){
    const response = await algoliaClient
      .getIndex()
      .search<ScrapingData>('', opt);

    for (const scrapingData of response.hits) {
      console.log(JSON.stringify(scrapingData));
      context.setScrapingData(scrapingData);
    }

    console.log('AggregateAlgolia.exec.end');
  }
}
