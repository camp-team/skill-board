import * as http from '../http/http.util';
import * as functions from 'firebase-functions';
import { AggregateContext } from './aggregate.context';
import { AggregateAlgolia } from './aggregate.algolia';
import { AggregateFirestore } from './aggregate.firestore';

const runtimeOpts: functions.RuntimeOptions = {
  timeoutSeconds: 540,
  memory: '2GB',
};

export const aggregateScrapingData = functions
  .region('asia-northeast1')
  .runWith(runtimeOpts)
  .https.onRequest(async (req, res) => {
    if (!http.auth(req)) {
      return res.status(404).send(); // 一般公開用のapiではないので、エラー内容は出さずnot foundで返す
    }

    try {
      const context = new AggregateContext(
        Number(req.query.minimumMode) // オプション増えてきたら、interface化して渡す
      );

      const algolia = new AggregateAlgolia();

      const scrapingTargets = ['levtech']; // スクレピング対象増えたらここに追記
      for (const scrapingTarget of scrapingTargets) {
        await algolia.loadScrapingData(context, scrapingTarget);
      }
      await new AggregateFirestore().exec(context);
      await algolia.replaceSkillData(context);

      return res.status(200).json({
        status: 'success',
        result: JSON.stringify(context.aggregateDataMap),
      });
    } catch (e) {
      console.log(
        'aggregateScrapingData.error request:' +
          JSON.stringify(http.reqLogInfo(req))
      );
      console.log('aggregateScrapingData.error error:' + JSON.stringify(e));
      return res.status(500).json({ status: 'error', error: e });
      // エラー時は、再実行すれば良いので、基本的に復旧処理は不要
      // (firestore〜algolia間データ不整合が発生する可能性があるが、最新データはalgoliaのみ参照しているので影響なし
      //  また、再実行で同日付のデータは全削除〜置換されるので、再実行で正常終了すれば、不整合解消される。)
    }
  });
