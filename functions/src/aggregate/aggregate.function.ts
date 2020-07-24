import * as http from '../utils/http.util';
import * as error from '../utils/error.util';
import * as functions from 'firebase-functions';
import { AggregateContext } from './aggregate.context';
import { AggregateAlgolia } from './aggregate.algolia';
import { AggregateFirestore } from './aggregate.firestore';
import { SkillsAlgolia } from '../skills/skills.algolia';

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
      const context = new AggregateContext();

      const scrapingTargets = ['levtech']; // スクレピング対象が増えたら追記
      const algolia = new AggregateAlgolia();
      for (const scrapingTarget of scrapingTargets) {
        await algolia.loadScrapingData(context, scrapingTarget);
      }
      await new AggregateFirestore().exec(context);
      await new SkillsAlgolia().replaceSkillData(context.skills);

      return res.status(200).json({
        status: 'success',
        result: JSON.stringify(context),
      });
    } catch (e) {
      console.error('aggregateScrapingData.request:' + http.forLog(req));
      console.error('aggregateScrapingData.error:', error.forLog(e));
      return res.status(500).json({ status: 'error', error: error.forJson(e) });
      // エラー時は、再実行すれば良いので、基本的に復旧処理は不要
      // (再実行で各種データは全上書きされるので、最後に実行されたデータのみが残る)
    }
  });
