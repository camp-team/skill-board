import { LevtechScraping } from './levtech.scraping';

// [Nodeでの単体実行用ファイル]
// npx ts-node src/scraping/levtech/levtech.scraping-node.ts

// tslint:disable-next-line: no-floating-promises
new LevtechScraping().exec().then((dataList) => {
  dataList.forEach((d) => console.log(d));
});
