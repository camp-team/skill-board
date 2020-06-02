import { AngularFirestoreDocument } from '@angular/fire/firestore/public_api';

/**
 * 集計結果.
 * スクレイピング(function)にて作成される
 */
export interface AggregationResult {
  skillId: string;
  price: number;
  vacancy: number;
  aggregationDate?: Date; // 仮開発中なので任意項目。
}
