import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterFormComponent } from './filter-form/filter-form.component';
import { BannerComponent } from './banner/banner.component';
import { SkillsToChartDataGroupPipe } from '../pipes/skills-to-chart-data-group.pipe';
import { TransitionChartComponent } from './charts/transition-chart/transition-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BreakdownChartComponent } from './charts/breakdown-chart/breakdown-chart.component';
import { NgxPieChartZeroMarginDirective } from '../directives/ngx-pie-chart-zero-margin.directive';

@NgModule({
  declarations: [
    FilterFormComponent,
    BannerComponent,
    SkillsToChartDataGroupPipe,
    TransitionChartComponent,
    BreakdownChartComponent,
    NgxPieChartZeroMarginDirective,
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
