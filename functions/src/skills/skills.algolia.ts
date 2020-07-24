import { AlgoliaClinent } from '../algolia/algolia.client';
import { Skill } from '../interface/skill';

export class SkillsAlgolia {
  /**
   * algoliaにスキルデータを反映.
   * スキルデータが更新されるのは、集計後のみなので、firestore.triggerは使わず、replaceAllObjectsでまとめて置換
   * (algoliaに反映するのは最新データのみ)
   */
  public async replaceSkillData(skillArray: Skill[]) {
    console.log('AggregateAlgolia.replaceSkillData.start');

    const algoliaClient = new AlgoliaClinent('skills');

    // algolia用に、objectIDを付加
    const agSkills: any[] = [];
    skillArray.forEach((fsSkill) => {
      const agSkill: any = fsSkill;
      agSkill.objectID = fsSkill.skillId;
      agSkills.push(agSkill);
    });

    // replaceAllにて、全データ一括置換
    await algoliaClient.getIndex().replaceAllObjects(agSkills);

    console.log('AggregateAlgolia.replaceSkillData.end');
  }
}
