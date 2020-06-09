import { Injectable } from '@angular/core';
import { Skill } from '../interfaces/skill';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class SkillService {
  // 遷移チャート用サンプルデータ
  static TRANSITION_SKILLS: Skill[] = [
    {
      skillId: 'angular',
      skillCaption: 'Angular',
      price: 1000000,
      vacancy: 101,
      aggregatedAt: firestore.Timestamp.fromDate(new Date(2020, 0, 1)),
    },
    {
      skillId: 'angular',
      skillCaption: 'Angular',
      price: 1500000,
      vacancy: 121,
      aggregatedAt: firestore.Timestamp.fromDate(new Date(2020, 1, 1)),
    },
    {
      skillId: 'angular',
      skillCaption: 'Angular',
      price: 2000000,
      vacancy: 141,
      aggregatedAt: firestore.Timestamp.fromDate(new Date(2020, 2, 1)),
    },
    {
      skillId: 'angular',
      skillCaption: 'Angular',
      price: 1500001,
      vacancy: 151,
      aggregatedAt: firestore.Timestamp.fromDate(new Date(2020, 3, 1)),
    },
    {
      skillId: 'angular',
      skillCaption: 'Angular',
      price: 1500001,
      vacancy: 151,
      aggregatedAt: firestore.Timestamp.fromDate(new Date(2020, 4, 1)),
    },
    {
      skillId: 'angular',
      skillCaption: 'Angular',
      price: 1500001,
      vacancy: 151,
      aggregatedAt: firestore.Timestamp.fromDate(new Date(2020, 5, 1)),
    },
  ];

  // 更新用サンプルデータ
  static SKILLS_FOR_UPLOAD: ReadonlyArray<Skill> = [
    {
      skillId: 'angular',
      skillCaption: 'Angular',
      skillCategories: ['フレームワーク', 'TypeScript', 'フロントエンド'],
      price: 500000,
      vacancy: 100,
      aggregatedAt: firestore.Timestamp.fromDate(new Date(2020, 5, 1)),
      createdAt: firestore.Timestamp.fromDate(new Date(2020, 5, 1)),
      updatedAt: firestore.Timestamp.now(),
    },
    {
      skillId: 'vue',
      skillCaption: 'Vue',
      skillCategories: ['フレームワーク', 'TypeScript', 'フロントエンド'],
      price: 400000,
      vacancy: 80,
      aggregatedAt: firestore.Timestamp.fromDate(new Date(2020, 5, 1)),
      createdAt: firestore.Timestamp.fromDate(new Date(2020, 5, 1)),
      updatedAt: firestore.Timestamp.now(),
    },
    {
      skillId: 'react',
      skillCaption: 'React',
      skillCategories: ['フレームワーク', 'TypeScript', 'フロントエンド'],
      price: 300000,
      vacancy: 60,
      aggregatedAt: firestore.Timestamp.fromDate(new Date(2020, 5, 1)),
      createdAt: firestore.Timestamp.fromDate(new Date(2020, 5, 1)),
      updatedAt: firestore.Timestamp.now(),
    },
    {
      skillId: 'java',
      skillCaption: 'Java',
      skillCategories: ['言語', 'バックエンド'],
      price: 380000,
      vacancy: 180,
      aggregatedAt: firestore.Timestamp.fromDate(new Date(2020, 5, 1)),
      createdAt: firestore.Timestamp.fromDate(new Date(2020, 5, 1)),
      updatedAt: firestore.Timestamp.now(),
    },
    {
      skillId: 'rails',
      skillCaption: 'Ruby on rails',
      skillCategories: ['フレームワーク', 'Ruby', 'バックエンド'],
      price: 400000,
      vacancy: 180,
      aggregatedAt: firestore.Timestamp.fromDate(new Date(2020, 5, 1)),
      createdAt: firestore.Timestamp.fromDate(new Date(2020, 5, 1)),
      updatedAt: firestore.Timestamp.now(),
    },
    {
      skillId: 'nodejs',
      skillCaption: 'Node.js',
      skillCategories: ['JavaScript'],
      price: 290000,
      vacancy: 170,
      aggregatedAt: firestore.Timestamp.fromDate(new Date(2020, 5, 1)),
      createdAt: firestore.Timestamp.fromDate(new Date(2020, 5, 1)),
      updatedAt: firestore.Timestamp.now(),
    },
    {
      skillId: 'jquery',
      skillCaption: 'jQuery',
      skillCategories: ['JavaScript', 'ライブラリ'],
      price: 280000,
      vacancy: 290,
      aggregatedAt: firestore.Timestamp.fromDate(new Date(2020, 5, 1)),
      createdAt: firestore.Timestamp.fromDate(new Date(2020, 5, 1)),
      updatedAt: firestore.Timestamp.now(),
    },
  ];

  constructor(private afs: AngularFirestore) {}

  // とりあえず引数なし。ゆくゆくは条件渡してピックアップするイメージ
  // 画面ごとにソート順も使い分けたい
  getSkills(): Observable<Skill[]> {
    return this.afs
      .collection<Skill>('skills', (ref) => ref.orderBy('price', 'desc'))
      .valueChanges();
  }

  getSkill(skillId: string): Observable<Skill> {
    return this.afs.doc<Skill>('skills/' + skillId).valueChanges();
  }

  getTransitionSkills(skillId: string): Skill[] {
    return SkillService.TRANSITION_SKILLS;
  }

  // 今だけメソッド　テストデータをfirestoreに登録
  uploadSampleData(): void {
    console.log('uploadSampleData');
    SkillService.SKILLS_FOR_UPLOAD.forEach((skill) => {
      // 更新日
      (skill.updatedAt = firestore.Timestamp.now()),
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
