import { Injectable } from '@angular/core';
import { AggregationResult } from 'src/app/interfaces/aggregation-result';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AggregationResultService {
  constructor(private afs: AngularFirestore) {}

  // とりあえず引数なし。ゆくゆくは条件渡してピックアップするイメージ
  getResults(): Observable<AggregationResult[]> {
    return this.afs
      .collection<AggregationResult>('aggregation-result', (ref) =>
        ref.orderBy('price', 'desc')
      )
      .valueChanges();
  }
}
