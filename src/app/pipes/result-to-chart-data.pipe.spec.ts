import { ResultToChartDataPipe } from './result-to-chart-data.pipe';
import { SkillService } from '../services/skill.service';
import { ResultToSkillPipe } from './result-to-skill.pipe';
import { DatePipe } from '@angular/common';

describe('ResultToChartDataPipe', () => {
  it('create an instance', () => {
    const pipe = new ResultToChartDataPipe();
    expect(pipe).toBeTruthy();
  });
});
