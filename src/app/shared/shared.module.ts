import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterFormComponent } from './filter-form/filter-form.component';
import { BannerComponent } from './banner/banner.component';
import { ResultToChartDataGroupPipe } from '../pipes/result-to-chart-data-group.pipe';
import { TransitionChartComponent } from './transition-chart/transition-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [
    FilterFormComponent,
    BannerComponent,
    ResultToChartDataGroupPipe,
    TransitionChartComponent,
  ],
  imports: [CommonModule, NgxChartsModule],
  exports: [
    FilterFormComponent,
    BannerComponent,
    ResultToChartDataGroupPipe,
    TransitionChartComponent,
  ],
})
export class SharedModule {}
