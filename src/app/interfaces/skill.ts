import { AngularFirestoreDocument } from '@angular/fire/firestore/public_api';

export interface Skill {
  id?: string;
  skillId: string;
  skillCaption: string;
  skillCategories?: string[];
  price?: number;
  vacancy?: number;
  aggregationDate?: Date; // 仮開発中なので任意項目。
  createdAt?: Date;
  updatedAt?: Date;
}
