import { Skill } from './skill';
import { AngularFirestoreDocument } from '@angular/fire/firestore/public_api';

/**
 * 集計結果.
 * スクレイピング(function)にて作成される
 */
export interface AggregationResult {
  skill: Skill;
  // skillRef: AngularFirestoreDocument<Skill>;
  // 集計対象サイトを追加
  // 集計条件を追加
  // skillId: string;
  // skillCaption: string;
  // skillCategories: string[];
  price: number;
  vacancy: number;
  aggregationDate: Date; // 取り急ぎ使わないので、一旦コメントアウト。集計日付。過去ログの管理方法は要検討
}
