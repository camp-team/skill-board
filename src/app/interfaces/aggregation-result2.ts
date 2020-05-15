import { Skill } from './skill';
import {
  AngularFirestoreDocument,
  DocumentReference,
} from '@angular/fire/firestore/public_api';
import { Observable } from 'rxjs';

/**
 * 集計結果.
 * スクレイピング(function)にて作成される
 */
export interface AggregationResult2 {
  // skill: Skill;
  // skillRef: Skill;
  skillRef: DocumentReference;
  // 集計対象サイトを追加
  // 集計条件を追加
  price: number;
  vacancy: number;
  aggregationDate: Date; // 集計日付。過去ログの管理方法は要検討
}
