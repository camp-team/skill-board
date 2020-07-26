import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterFormComponent } from './filter-form/filter-form.component';
import { BannerComponent } from './banner/banner.component';
import { SkillsToChartDataGroupPipe } from '../pipes/skills-to-chart-data-group.pipe';
import { TransitionChartComponent } from './transition-chart/transition-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BreakdownChartComponent } from './breakdown-chart/breakdown-chart.component';

@NgModule({
  declarations: [
    FilterFormComponent,
    BannerComponent,
    SkillsToChartDataGroupPipe,
    TransitionChartComponent,
    BreakdownChartComponent,
  ],
  imports: [CommonModule, NgxChartsModule],
  exports: [
    FilterFormComponent,
    BannerComponent,
    SkillsToChartDataGroupPipe,
    TransitionChartComponent,
    BreakdownChartComponent,
  ],
})
export class SharedModule {}
