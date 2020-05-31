import { Injectable } from '@angular/core';
import { AggregationResult } from 'src/app/interfaces/aggregation-result';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AggregationResultService {
  // 画面実装用ダミーデータ
  static TRANSITION_RESULTS_DUMMY: AggregationResult[] = [
    {
      skillId: 'angular',
      price: 1000000,
      vacancy: 101,
      aggregationDate: new Date(2020, 0, 1),
    },
    {
      skillId: 'angular',
      price: 1500000,
      vacancy: 121,
      aggregationDate: new Date(2020, 1, 1),
    },
    {
      skillId: 'angular',
      price: 2000000,
      vacancy: 141,
      aggregationDate: new Date(2020, 2, 1),
    },
    {
      skillId: 'angular',
      price: 1500001,
      vacancy: 151,
      aggregationDate: new Date(2020, 3, 1),
    },
    {
      skillId: 'angular',
      price: 1500001,
      vacancy: 151,
      aggregationDate: new Date(2020, 4, 1),
    },
    {
      skillId: 'angular',
      price: 1500001,
      vacancy: 151,
      aggregationDate: new Date(2020, 5, 1),
    },
  ];

  constructor(private afs: AngularFirestore) {}

  // とりあえず引数なし。ゆくゆくは条件渡してピックアップするイメージ
  getResults(): Observable<AggregationResult[]> {
    return this.afs
      .collection<AggregationResult>('aggregation-result', (ref) =>
        ref.orderBy('price', 'desc')
      )
      .valueChanges();
  }

  getResult(skillId: string): Observable<AggregationResult> {
    return this.afs
      .doc<AggregationResult>('aggregation-result/' + skillId)
      .valueChanges();
  }

  getTransitionResult(skillId: string): AggregationResult[] {
    return AggregationResultService.TRANSITION_RESULTS_DUMMY;
  }
}
