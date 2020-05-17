import { AngularFirestoreDocument } from '@angular/fire/firestore/public_api';

export interface Skill {
  skillId: string;
  skillCaption: string;
  skillCategories: string[];
}
