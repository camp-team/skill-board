import { Skill } from 'functions/src/interface/skill';
import { ParamMap } from '@angular/router';
import { SkillDataModel } from './skill-data.model';

export class SkillsHeaderModel {
  // 全skillのDB値(数10件程度なので、都度アクセスさせず最初に読み込んでしまう)
  readonly allSkillMap: Map<string, Skill>; // <skillId, skill>

  // 表示用データ
  private skills: SkillDataModel[] = [];

  // チャートなどで利用するスキル識別用の色
  // スキル固有の色を持っているわけではなく、表示順で割当
  private readonly skillColorScheme = [
    '#0096EF',
    '#FF443E',
    '#FFCA43',
    '#2FA04E',
    '#A228AD',
  ];

  constructor(allSkillMap: Map<string, Skill>) {
    this.allSkillMap = allSkillMap;
  }

  toParam() {
    return { skills: this.skills.map((d) => d.skillId).join(',') };
  }

  setParam(paramMap: ParamMap): SkillsHeaderModel {
    // パラメータ重複を排除するため、Setで取得
    const skillIdSet = new Set<string>(paramMap.get('skills')?.split(','));

    this.skills.splice(0);
    for (const skillId of skillIdSet.values()) {
      this.appendSkill(skillId);
    }
    return this;
  }

  /**
   * 末尾にスキルを追加.
   * @return 追加有無(無効なskillIdや、追加済みだった場合、追加されない)
   */
  appendSkill(skillId: string): boolean {
    if (
      this.allSkillMap.has(skillId) &&
      !this.getSkillIds().includes(skillId)
    ) {
      const skillData = this.allSkillMap.get(skillId) as SkillDataModel;
      skillData.skillColor = this.getSkillColor(this.skills.length);
      this.skills.push(skillData);
      return true;
    } else {
      return false;
    }
  }

  /**
   * スキルの除去.
   * @return 除去有無(そもそも追加されていないskillIdだった場合、除去されない)
   */
  removeSkill(skillId: string): boolean {
    const beforeLenght = this.skills.length;
    this.skills = this.skills.filter((s) => s.skillId !== skillId);

    if (beforeLenght > this.skills.length) {
      this.skills.forEach(
        (s, index) => (s.skillColor = this.getSkillColor(index))
      ); // indexがずれるので、colorを更新
      return true;
    } else {
      return false;
    }
  }

  getSkills(): ReadonlyArray<SkillDataModel> {
    // appendSkill&removeSkill以外からの配列の変更を許容したくないので、ReadonlyArrayで返す
    return this.skills;
  }

  private getSkillColor(index: number): string {
    return this.skillColorScheme[index % this.skillColorScheme.length];
  }

  private getSkillIds(): string[] {
    return this.skills.map((s) => s.skillId);
  }
}
