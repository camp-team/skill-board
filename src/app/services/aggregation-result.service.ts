import { Injectable } from '@angular/core';
import { AggregationResult } from 'src/app/interfaces/aggregation-result';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AggregationResult2 } from '../interfaces/aggregation-result2';
import { Skill } from '../interfaces/skill';
import { async } from '@angular/core/testing';

@Injectable({
  providedIn: 'root',
})
export class AggregationResultService {
  constructor(private afs: AngularFirestore) {}

  // view作成用のダミーデータ
  DUMMY_DATA: AggregationResult[] = [
    {
      // skillRef: null,
      skill: {
        name: 'angular',
        caption: 'Angular',
        categries: [
          { name: 'frame-work', caption: 'フレームワーク' },
          { name: 'type-script', caption: 'TypeScript' },
          { name: 'front-end', caption: 'フロントエンド' },
        ],
      },
      price: 500000,
      vacancy: 100,
      aggregationDate: new Date('2020/5/10'),
    },
    {
      // skillRef: null,
      skill: {
        name: 'vue',
        caption: 'Vue',
        categries: [
          { name: 'frame-work', caption: 'フレームワーク' },
          { name: 'type-script', caption: 'TypeScript' },
          { name: 'front-end', caption: 'フロントエンド' },
        ],
      },
      price: 400000,
      vacancy: 80,
      aggregationDate: new Date('2020/5/10'),
    },
    {
      // skillRef: null,
      skill: {
        name: 'react',
        caption: 'React',
        categries: [
          { name: 'frame-work', caption: 'フレームワーク' },
          { name: 'type-script', caption: 'TypeScript' },
          { name: 'front-end', caption: 'フロントエンド' },
        ],
      },
      price: 300000,
      vacancy: 60,
      aggregationDate: new Date('2020/5/10'),
    },
  ];

  // とりあえず引数なし。ゆくゆくは条件渡してピックアップするイメージ
  // ダミーデータなので、Observableも未使用
  getResults(): AggregationResult[] {
    console.log('getResults');

    this.afs
      .collection<AggregationResult2>('aggregation-result')
      .valueChanges()
      .subscribe((results) => {
        for (const res of results) {
          console.log(res);
          console.log(res.skillRef);

          // let snap = await res.skillRef.get();

          // const aaaa = await res.skillRef.get();

          res.skillRef.get().then((o) => {
            console.log(o.data());
            console.log(o.data().id);
            console.log((o.data() as Skill).caption);
          });

          this.afs
            .doc<Skill>(res.skillRef)
            .valueChanges()
            .subscribe((skill) => {
              console.log(skill);
              console.log(skill.caption);
            });
        }
      });

    // results.pipe(
    //   map((mapResults) => {
    //     console.log(mapResults);

    //     for (const res of mapResults) {
    //       console.log(res);
    //       console.log(
    //         res.skillRef.valueChanges().subscribe((skill) => {
    //           console.log(skill.caption);
    //         })
    //       );
    //     }
    //   })
    // );

    return this.DUMMY_DATA;
  }
}
