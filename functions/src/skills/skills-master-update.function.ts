import * as http from '../utils/http.util';
import * as error from '../utils/error.util';
import * as functions from 'firebase-functions';
import { SkillsMasterUpdateFirestore } from './skills-master-update.firestore';
import { SkillsAlgolia } from './skills.algolia';

export const skillsMasterUpdate = functions
  .region('asia-northeast1')
  .https.onRequest(async (req, res) => {
    if (!http.auth(req)) {
      return res.status(404).send(); // 一般公開用のapiではないので、エラー内容は出さずnot foundで返す
    }

    try {
      const newDataArray = await new SkillsMasterUpdateFirestore().exec();
      await new SkillsAlgolia().replaceSkillData(newDataArray);
      return res.status(200).json({ status: 'success', result: newDataArray });
    } catch (e) {
      console.log('skillsMasterUpdate.error request:' + http.forLog(req));
      console.log('skillsMasterUpdate.error error:' + error.forLog(e));
      return res.status(500).json({ status: 'error', error: error.forJson(e) });
      // エラー時は、再実行すれば良いので、基本的に復旧処理は不要
    }
  });
