import { firestore } from 'firebase-admin';

export interface Skill {
  skillId: string;
  skillCaption: string;
  skillCategories?: string[];
  price: number;
  vacancy: number;
  aggregatedDate?: number;
  aggregatedAt: firestore.Timestamp;
  createdAt?: firestore.Timestamp;
  updatedAt?: firestore.Timestamp;
}
