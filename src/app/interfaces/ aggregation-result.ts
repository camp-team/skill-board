import { Skill } from './skill';

/**
 * 集計結果.
 * スクレイピング(function)にて作成される
 */
export interface AggregationResult {
  skill: Skill;
  // 集計対象サイトを追加
  // 集計条件を追加
  price: number;
  vacancy: number;
  aggregationDate: Date; // 集計日付。過去ログの管理方法は要検討
}