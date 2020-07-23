import * as http from '../utils/http.util';
import * as error from '../utils/error.util';
import * as functions from 'firebase-functions';
import { LevtechScraping } from './levtech/levtech.scraping';
import { ScrapingFirestore } from './scraping.firestore';
import { ScrapingContext } from './scraping.context';
import { ScrapingAlgolia } from './scraping.algolia';

const runtimeOpts: functions.RuntimeOptions = {
  timeoutSeconds: 540,
  memory: '2GB',
};

export const scrapingLevtech = functions
  .region('asia-northeast1')
  .runWith(runtimeOpts)
  .https.onRequest(async (req, res) => {
    if (!http.auth(req)) {
      return res.status(404).send(); // 一般公開用のapiではないので、エラー内容は出さずnot foundで返す
    }

    try {
      const context = new ScrapingContext(
        'levtech',
        Number(req.query.minimumMode) // オプション増えてきたら、interface化して渡す
      );
      await new LevtechScraping().exec(context);
      await new ScrapingFirestore().exec(context);
      await new ScrapingAlgolia().exec(context); // firestoreで採番されたIDを使うので、firestore保存後に実行
      return res
        .status(200)
        .json({ status: 'success', result: context.getDataHeader() });
    } catch (e) {
      console.log('scrapingLevtech.error request:' + http.forLog(req));
      console.log('scrapingLevtech.error error:' + error.forLog(e));
      return res.status(500).json({ status: 'error', error: error.forJson(e) });
      // エラー時は、再実行すれば良いので、基本的に復旧処理は不要
      // (firestore〜algolia間データ不整合が発生する可能性があるが、最新データはalgoliaのみ参照しているので影響なし
      //  また、再実行で同日付のデータは全削除〜置換されるので、再実行で正常終了すれば、不整合解消される。)
    }
  });
