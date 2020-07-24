import * as admin from 'firebase-admin';
import { Skill } from '../interface/skill';
import { SkillMaster } from './skills-master';

export class SkillsMasterUpdateFirestore {
  private db: admin.firestore.Firestore;
  private readonly nowTs: admin.firestore.Timestamp;

  constructor() {
    this.db = admin.firestore();
    this.nowTs = admin.firestore.Timestamp.now();
  }

  public async exec(): Promise<Skill[]> {
    console.log('SkillsMasterUpdateFirestore.exec.start');

    const skillsRef = this.db.collection('skills');

    // 現在のデータをmap形式にして取得
    const skillsCurrentDataMap = (await skillsRef.get()).docs.reduce(
      (map, doc) => {
        const skill = doc.data() as Skill;
        map.set(skill.skillId, skill);
        return map;
      },
      new Map<string, Skill>()
    );

    const newDataArray: Skill[] = [];
    for (const masterData of SkillMaster.data) {
      const newData = this.prepareNewSkillData(
        masterData,
        skillsCurrentDataMap
      );
      await skillsRef.doc(newData.skillId).set(newData);
      newDataArray.push(newData);
    }

    console.log('SkillsMasterUpdateFirestore.exec.end');

    return newDataArray;
  }

  private prepareNewSkillData(
    masterData: Skill,
    currentDataMap: Map<string, Skill>
  ): Skill {
    const currentData = currentDataMap.get(masterData.skillId);
    if (currentData) {
      // すでに存在しているデータの場合、マスターで管理している情報を上書き
      const newData = currentData;
      newData.skillCaption = masterData.skillCaption;
      newData.skillCategories = masterData.skillCategories;
      newData.updatedAt = this.nowTs;
      return newData;
    } else {
      // 新規登録データの場合、日付のみセット
      const newData = masterData;
      newData.createdAt = this.nowTs;
      newData.updatedAt = this.nowTs;
      return newData;
    }
  }
}
