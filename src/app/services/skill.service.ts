import { Injectable } from '@angular/core';
import { Skill } from '../interfaces/skill';

@Injectable({
  providedIn: 'root',
})
export class SkillService {
  static SKILLS: ReadonlyArray<Skill> = [
    {
      skillId: 'angular',
      skillCaption: 'Angular',
      skillCategories: [
        'フレームワーク',
        'TypeScript',
        'フロントエンド',
        'CategoryA',
      ],
    },
    {
      skillId: 'vue',
      skillCaption: 'Vue',
      skillCategories: [
        'フレームワーク',
        'TypeScript',
        'フロントエンド',
        'CategoryV',
      ],
    },
    {
      skillId: 'react',
      skillCaption: 'React',
      skillCategories: [
        'フレームワーク',
        'TypeScript',
        'フロントエンド',
        'CategoryR',
      ],
    },
    {
      skillId: 'java',
      skillCaption: 'Java',
      skillCategories: ['言語', 'バックエンド', 'CategoryJ'],
    },
  ];

  constructor() {}

  getSkill(skillId: string): Skill {
    return SkillService.SKILLS.find((skill) => skill.skillId === skillId);
  }
}
