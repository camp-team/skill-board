import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterFormComponent } from './filter-form/filter-form.component';
import { BannerComponent } from './banner/banner.component';
import { ResultToSkillPipe } from '../pipes/result-to-skill.pipe';
import { ResultToChartDataPipe } from '../pipes/result-to-chart-data.pipe';

@NgModule({
  declarations: [
    FilterFormComponent,
    BannerComponent,
    ResultToSkillPipe,
    ResultToChartDataPipe,
  ],
  imports: [CommonModule],
  exports: [
    FilterFormComponent,
    BannerComponent,
    ResultToSkillPipe,
    ResultToChartDataPipe,
  ],
})
export class SharedModule {}
