import { AngularFirestoreDocument } from '@angular/fire/firestore/public_api';
import { firestore } from 'firebase';

export interface Skill {
  skillId: string;
  skillCaption: string;
  skillCategories?: string[]; // サンプルデータ用に、暫定的に任意項目
  price: number;
  vacancy: number;
  aggregatedAt: firestore.Timestamp;
  createdAt?: firestore.Timestamp; // サンプルデータ用に、暫定的に任意項目
  updatedAt?: firestore.Timestamp; // サンプルデータ用に、暫定的に任意項目
}
