import { SkillCategory } from './skill-category';

/**
 * スキル情報.
 */
export interface Skill {
  name: string; // 内部識別名称:半角小文字
  caption: string; // 表示用:文字列ならなんでも
  categries: SkillCategory[]; // サブコレクションでtag的な感じ
}
