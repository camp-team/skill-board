import { ScrapingContext } from './scraping.context';
import { AlgoliaClinent } from '../algolia/algolia.client';

export class ScrapingAlgolia {
  public async exec(context: ScrapingContext) {
    console.log('ScrapingAlgolia.exec.start');

    // index名からclientを生成(index名はスクレイピング対象ごとに決まる)
    const algoliaClient = new AlgoliaClinent(context.getAlgoliaIndexName());

    // objectIDは、ScrapingFirestore内でセットされているので、そのままindex保存
    await algoliaClient.getIndex().replaceAllObjects(context.getDataList());

    console.log('ScrapingAlgolia.exec.end');
  }
}
