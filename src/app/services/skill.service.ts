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
      skillCategories: ['フレームワーク', 'TypeScript', 'フロントエンド'],
    },
    {
      skillId: 'vue',
      skillCaption: 'Vue',
      skillCategories: ['フレームワーク', 'TypeScript', 'フロントエンド'],
    },
    {
      skillId: 'react',
      skillCaption: 'React',
      skillCategories: ['フレームワーク', 'TypeScript', 'フロントエンド'],
    },
    {
      skillId: 'java',
      skillCaption: 'Java',
      skillCategories: ['言語', 'バックエンド'],
    },
    {
      skillId: 'rails',
      skillCaption: 'Ruby on rails',
      skillCategories: ['フレームワーク', 'Ruby', 'バックエンド'],
    },
    {
      skillId: 'nodejs',
      skillCaption: 'Node.js',
      skillCategories: ['JavaScript'],
    },
    {
      skillId: 'jquery',
      skillCaption: 'jQuery',
      skillCategories: ['JavaScript', 'ライブラリ'],
    },
  ];

  constructor() {}

  getSkill(skillId: string): Skill {
    return SkillService.SKILLS.find((skill) => skill.skillId === skillId);
  }

  getSkills(): Skill[] {
    return SkillService.SKILLS.concat();
  }
}
