import { LevtechScraping } from './levtech.scraping';
import { ScrapingContext } from '../scraping.context';

// [Nodeでの単体実行用ファイル]
// npx ts-node src/scraping/levtech/levtech.scraping-node.ts

// tslint:disable-next-line: no-floating-promises
new LevtechScraping().exec(new ScrapingContext('levtech')).then((context) => {
  const dataList = context.getDataList();
  for (const d of dataList) {
    console.log(d);
  }
  console.log(context.getDataHeader());
});
