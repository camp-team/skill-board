import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterFormComponent } from './filter-form/filter-form.component';
import { BannerComponent } from './banner/banner.component';
import { SkillsToChartDataGroupPipe } from '../pipes/skills-to-chart-data-group.pipe';
import { TransitionChartComponent } from './charts/transition-chart/transition-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BreakdownChartComponent } from './charts/breakdown-chart/breakdown-chart.component';
import { NgxPieChartZeroMarginDirective } from '../directives/ngx-pie-chart-zero-margin.directive';
import { DistributionChartComponent } from './charts/distribution-chart/distribution-chart.component';

@NgModule({
  declarations: [
    FilterFormComponent,
    BannerComponent,
    SkillsToChartDataGroupPipe,
    TransitionChartComponent,
    BreakdownChartComponent,
    NgxPieChartZeroMarginDirective,
    DistributionChartComponent,
  ],
  imports: [CommonModule, NgxChartsModule],
  exports: [
    FilterFormComponent,
    BannerComponent,
    SkillsToChartDataGroupPipe,
    TransitionChartComponent,
    BreakdownChartComponent,
    DistributionChartComponent,
  ],
})
export class SharedModule {}
