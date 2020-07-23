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

    const skillsRef = this.db.collection('skills'); // 最新データ
    const skillsHistoryRef = this.db.collection(
      'skills-history/' + context.aggregateDate
    ); // 累積データ

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
      await skillsRef.doc(skill.skillId).set(skill);
      await skillsHistoryRef.doc(skill.skillId).set(skill);
      context.skills.push(skill); // algoliaにも保存する必要があるので、context内にセットしておく
    }

    console.log('AggregateFirestore.exec.end');
  }
}
