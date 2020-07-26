import { Directive, Self } from '@angular/core';
import { PieChartComponent } from '@swimlane/ngx-charts';

@Directive({
  selector: '[appNgxPieChartZeroMargin]',
})
// ngx-charts-pie-chart専用
// pie-chartのマージンを削除()
export class NgxPieChartZeroMarginDirective {
  constructor(@Self() pieChart: PieChartComponent) {
    pieChart.margins = [0, 0, 0, 0];
  }
}
