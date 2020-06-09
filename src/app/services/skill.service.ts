import { Injectable } from '@angular/core';
import { Skill } from '../interfaces/skill';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SkillService {
  // 画面実装用ダミーデータ
  static TRANSITION_RESULTS_DUMMY: Skill[] = [
    {
      skillId: 'angular',
      skillCaption: 'Angular',
      price: 1000000,
      vacancy: 101,
      aggregationDate: new Date(2020, 0, 1),
    },
    {
      skillId: 'angular',
      skillCaption: 'Angular',
      price: 1500000,
      vacancy: 121,
      aggregationDate: new Date(2020, 1, 1),
    },
    {
      skillId: 'angular',
      skillCaption: 'Angular',
      price: 2000000,
      vacancy: 141,
      aggregationDate: new Date(2020, 2, 1),
    },
    {
      skillId: 'angular',
      skillCaption: 'Angular',
      price: 1500001,
      vacancy: 151,
      aggregationDate: new Date(2020, 3, 1),
    },
    {
      skillId: 'angular',
      skillCaption: 'Angular',
      price: 1500001,
      vacancy: 151,
      aggregationDate: new Date(2020, 4, 1),
    },
    {
      skillId: 'angular',
      skillCaption: 'Angular',
      price: 1500001,
      vacancy: 151,
      aggregationDate: new Date(2020, 5, 1),
    },
  ];

  static SKILLS: ReadonlyArray<Skill> = [
    {
      id: 'angular',
      skillId: 'angular',
      skillCaption: 'Angular',
      skillCategories: ['フレームワーク', 'TypeScript', 'フロントエンド'],
      price: 500000,
      vacancy: 100,
      aggregationDate: new Date(2020, 5, 1),
      createdAt: new Date(2020, 5, 1),
      updatedAt: new Date(),
    },
    {
      id: 'vue',
      skillId: 'vue',
      skillCaption: 'Vue',
      skillCategories: ['フレームワーク', 'TypeScript', 'フロントエンド'],
      price: 400000,
      vacancy: 80,
      aggregationDate: new Date(2020, 5, 1),
      createdAt: new Date(2020, 5, 1),
      updatedAt: new Date(),
    },
    {
      id: 'react',
      skillId: 'react',
      skillCaption: 'React',
      skillCategories: ['フレームワーク', 'TypeScript', 'フロントエンド'],
      price: 300000,
      vacancy: 60,
      aggregationDate: new Date(2020, 5, 1),
      createdAt: new Date(2020, 5, 1),
      updatedAt: new Date(),
    },
    {
      id: 'java',
      skillId: 'java',
      skillCaption: 'Java',
      skillCategories: ['言語', 'バックエンド'],
      price: 380000,
      vacancy: 180,
      aggregationDate: new Date(2020, 5, 1),
      createdAt: new Date(2020, 5, 1),
      updatedAt: new Date(),
    },
    {
      id: 'rails',
      skillId: 'rails',
      skillCaption: 'Ruby on rails',
      skillCategories: ['フレームワーク', 'Ruby', 'バックエンド'],
      price: 400000,
      vacancy: 180,
      aggregationDate: new Date(2020, 5, 1),
      createdAt: new Date(2020, 5, 1),
      updatedAt: new Date(),
    },
    {
      id: 'nodejs',
      skillId: 'nodejs',
      skillCaption: 'Node.js',
      skillCategories: ['JavaScript'],
      price: 290000,
      vacancy: 170,
      aggregationDate: new Date(2020, 5, 1),
      createdAt: new Date(2020, 5, 1),
      updatedAt: new Date(),
    },
    {
      id: 'jquery',
      skillId: 'jquery',
      skillCaption: 'jQuery',
      skillCategories: ['JavaScript', 'ライブラリ'],
      price: 280000,
      vacancy: 290,
      aggregationDate: new Date(2020, 5, 1),
      createdAt: new Date(2020, 5, 1),
      updatedAt: new Date(),
    },
  ];

  constructor(private afs: AngularFirestore) {}

  getSkill(skillId: string): Skill {
    return SkillService.SKILLS.find((skill) => skill.skillId === skillId);
  }

  getSkills(): Skill[] {
    return SkillService.SKILLS.concat();
  }

  // とりあえず引数なし。ゆくゆくは条件渡してピックアップするイメージ
  getResults(): Observable<Skill[]> {
    return this.afs
      .collection<Skill>('skills', (ref) => ref.orderBy('price', 'desc'))
      .valueChanges();
  }

  getResult(skillId: string): Observable<Skill> {
    return this.afs.doc<Skill>('skills/' + skillId).valueChanges();
  }

  getTransitionResult(skillId: string): Skill[] {
    return SkillService.TRANSITION_RESULTS_DUMMY;
  }

  // 今だけメソッド　テストデータをfirestoreに登録
  uploadSampleData(): void {
    console.log('uploadSampleData');
    SkillService.SKILLS.forEach((skill) => {
      // 更新日
      skill.updatedAt = new Date();

      this.afs
        .doc('skills/' + skill.skillId)
        .set(skill)
        .then(() => {
          console.log('doc:uploaded' + skill.skillId);
        });
    });
    alert('uploadSampleData.finished!');
  }
}
