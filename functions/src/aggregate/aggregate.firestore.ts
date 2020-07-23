import * as admin from 'firebase-admin';
import { AggregateContext } from './aggregate.context';
import { Skill } from '../interface/skill';

export class AggregateFirestore {
  private db: admin.firestore.Firestore;

  constructor() {
    this.db = admin.firestore();
  }

  /**
   * firestoreからskillデータ取得〜集計データ反映〜firestore更新
   * @param context
   */
  public async exec(context: AggregateContext) {
    console.log('AggregateFirestore.exec.start');

    const skillsRef = this.db.collection('skills');

    const nowTs = admin.firestore.Timestamp.now();
    const skills = (await skillsRef.get()).docs.map((doc) => {
      return doc.data() as Skill;
    });

    for (const skill of skills) {
      const aggregateData = context.getAggregateData(skill.skillId);
      skill.price = aggregateData.getAveragePrice();
      skill.vacancy = aggregateData.getDataCount();
      skill.updatedAt = nowTs;
      skill.aggregatedDate = context.aggregateDate;
      await skillsRef.doc(skill.skillId).set(skill); // 最新データ(上書き)
      await skillsRef
        .doc(skill.skillId)
        .collection('history')
        .doc(context.aggregateDate + '')
        .set(skill); // 累積データ(追加)
      context.skills.push(skill); // algoliaにも保存する必要があるので、context内にセットしておく
    }

    console.log('AggregateFirestore.exec.end');
  }
}
