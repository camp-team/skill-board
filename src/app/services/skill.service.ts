import { Injectable } from '@angular/core';
import { Skill } from '../interfaces/skill';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import algoliasearch from 'algoliasearch/lite';
import { map } from 'rxjs/operators';

const searchClient = algoliasearch(
  environment.algolia.appId,
  environment.algolia.searchKey
);

@Injectable({
  providedIn: 'root',
})
export class SkillService {
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

  getAllSkillMap(): Observable<Map<string, Skill>> {
    return this.getSkills().pipe(
      map((skills) => {
        const allSkillMap = new Map<string, Skill>();
        skills.forEach((skill) => allSkillMap.set(skill.skillId, skill));
        return allSkillMap;
      })
    );
  }

  getTransitionSkills(skillId: string): Observable<Skill[]> {
    // 累積データ(history)から、直近の10件を取得
    // ※firestore取得時は件数制限するために降順にしているが、pipe(map)で昇順に戻す
    return this.afs
      .collection<Skill>('skills/' + skillId + '/history', (ref) =>
        ref.orderBy('aggregatedDate', 'desc').limit(10)
      )
      .valueChanges()
      .pipe(
        map((skills) =>
          skills.sort((a, b) => a.aggregatedDate - b.aggregatedDate)
        )
      );
  }
}
