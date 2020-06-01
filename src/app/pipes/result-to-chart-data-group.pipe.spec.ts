import { ResultToChartDataGroupPipe } from './result-to-chart-data-group.pipe';
import { SkillService } from '../services/skill.service';
import { ResultToSkillPipe } from './result-to-skill.pipe';
import { DatePipe } from '@angular/common';

describe('ResultToChartDataPipe', () => {
  it('create an instance', () => {
    const pipe = new ResultToChartDataGroupPipe(new SkillService(), 'ja-JP');
    expect(pipe).toBeTruthy();
  });
});
