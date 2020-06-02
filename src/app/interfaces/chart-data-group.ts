import { AngularFirestoreDocument } from '@angular/fire/firestore/public_api';
import { ChartData } from './chart-data';

export interface ChartDataGroup {
  name: string;
  series: ChartData[];
}
