import { Injectable } from '@angular/core';
import { AggregationResult } from '../interfaces/ aggregation-result';

@Injectable({
  providedIn: 'root',
})
export class AggregationResultService {
  constructor() {}

  // view作成用のダミーデータ
  DUMMY_DATA: AggregationResult[] = [
    {
      skill: { name: 'Angular' },
      price: 500000,
      vacancy: 100,
      aggregationDate: new Date('2020/5/10'),
    },
    {
      skill: { name: 'Vue' },
      price: 400000,
      vacancy: 80,
      aggregationDate: new Date('2020/5/10'),
    },
    {
      skill: { name: 'React' },
      price: 300000,
      vacancy: 60,
      aggregationDate: new Date('2020/5/10'),
    },
  ];

  // とりあえず引数なし。ゆくゆくは条件渡してピックアップするイメージ
  // ダミーデータなので、Observableも未使用
  getResults(): AggregationResult[] {
    return this.DUMMY_DATA;
  }
}
