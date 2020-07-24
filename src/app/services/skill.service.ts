import { Injectable } from '@angular/core';
import { Skill } from '../interfaces/skill';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { firestore } from 'firebase';
import { environment } from 'src/environments/environment';
import algoliasearch from 'algoliasearch/lite';

const searchClient = algoliasearch(
  environment.algolia.appId,
  environment.algolia.searchKey
);

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

  index = {
    skills: searchClient.initIndex('skills'),
    // ゆくゆくはsort順ごとのindex追加
  };

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
}
