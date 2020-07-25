import { Skill } from '../interface/skill';

export class SkillMaster {
  static readonly data: ReadonlyArray<Skill> = [
    /**
     * 言語系
     */
    {
      skillId: 'java',
      skillCaption: 'Java',
      skillCategories: ['言語', 'バックエンド'],
    },
    {
      skillId: 'javascript',
      skillCaption: 'JavaScript',
      skillCategories: ['言語', 'フロントエンド'],
    },
    {
      skillId: 'php',
      skillCaption: 'PHP',
      skillCategories: ['言語', 'フロントエンド'],
    },
    {
      skillId: 'python',
      skillCaption: 'Python',
      skillCategories: ['言語'],
    },
    {
      skillId: 'sql',
      skillCaption: 'SQL',
      skillCategories: ['言語'],
    },
    {
      skillId: 'sql',
      skillCaption: 'SQL',
      skillCategories: ['言語'],
    },
    {
      skillId: 'ruby',
      skillCaption: 'Ruby',
      skillCategories: ['言語'],
    },
    {
      skillId: 'c++',
      skillCaption: 'C++',
      skillCategories: ['言語'],
    },
    {
      skillId: 'kotlin',
      skillCaption: 'Kotlin',
      skillCategories: ['言語'],
    },
    {
      skillId: 'swift',
      skillCaption: 'Swift',
      skillCategories: ['言語'],
    },
    {
      skillId: 'vb',
      skillCaption: 'VB',
      skillCategories: ['言語'],
    },

    {
      skillId: 'perl',
      skillCaption: 'Perl',
      skillCategories: ['言語'],
    },
    {
      skillId: 'cobol',
      skillCaption: 'COBOL',
      skillCategories: ['言語'],
    },

    /**
     * フレームワーク・ライブラリ
     */
    {
      skillId: 'angular',
      skillCaption: 'Angular',
      skillCategories: ['フレームワーク', 'TypeScript', 'フロントエンド'],
    },
    {
      skillId: 'vue',
      skillCaption: 'Vue',
      skillCategories: ['フレームワーク', 'TypeScript', 'フロントエンド'],
    },
    {
      skillId: 'react',
      skillCaption: 'React',
      skillCategories: ['フレームワーク', 'TypeScript', 'フロントエンド'],
    },
    {
      skillId: 'rails',
      skillCaption: 'Ruby on rails',
      skillCategories: ['フレームワーク', 'Ruby', 'バックエンド'],
    },
    {
      skillId: 'nodejs',
      skillCaption: 'Node.js',
      skillCategories: ['JavaScript'],
    },
    {
      skillId: 'jquery',
      skillCaption: 'jQuery',
      skillCategories: ['JavaScript', 'ライブラリ'],
    },

    {
      skillId: 'laravel',
      skillCaption: 'Laravel',
      skillCategories: ['PHP', 'フレームワーク'],
    },
    {
      skillId: 'spring',
      skillCaption: 'Spring',
      skillCategories: ['Java', 'フレームワーク'],
    },
    {
      skillId: 'django',
      skillCaption: 'Django',
      skillCategories: ['Python', 'フレームワーク'],
    },

    {
      skillId: 'struts',
      skillCaption: 'Struts',
      skillCategories: ['Java', 'フレームワーク'],
    },
    {
      skillId: 'cakephp',
      skillCaption: 'CakePHP',
      skillCategories: ['PHP', 'フレームワーク'],
    },

    /**
     * インフラ
     */
    {
      skillId: 'aws',
      skillCaption: 'AWS',
      skillCategories: ['インフラ'],
    },
    {
      skillId: 'azure',
      skillCaption: 'Microsoft Azure',
      skillCategories: ['インフラ'],
    },
    {
      skillId: 'gcp',
      skillCaption: 'Google Cloud Platform',
      skillCategories: ['インフラ'],
    },
  ];
}
