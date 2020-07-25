import { firestore } from 'firebase';

export interface Skill {
  readonly skillId: string;
  readonly skillCaption: string;
  readonly skillCategories: string[];
  readonly price: number;
  readonly vacancy: number;
  readonly aggregatedDate: number;
  readonly createdAt: firestore.Timestamp;
  readonly updatedAt: firestore.Timestamp;
}
