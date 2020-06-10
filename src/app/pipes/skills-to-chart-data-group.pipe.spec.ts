import { SkillsToChartDataGroupPipe } from './skills-to-chart-data-group.pipe';
import { SkillService } from '../services/skill.service';
import { AngularFirestore } from '@angular/fire/firestore/firestore';

describe('SkillsToChartDataGroupPipe', () => {
  it('create an instance', () => {
    const pipe = new SkillsToChartDataGroupPipe('ja-JP');
    expect(pipe).toBeTruthy();
  });
});
