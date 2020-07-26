import { Directive, Self } from '@angular/core';
import { PieChartComponent } from '@swimlane/ngx-charts';

@Directive({
  selector: '[appNgxPieChartZeroMargin]',
})
// ngx-charts-pie-chart専用
export class NgxPieChartZeroMarginDirective {
  constructor(@Self() pieChart: PieChartComponent) {
    // pie-chartのマージンを削除(デフォルトだと余分な空白が入ってしまう)
    pieChart.margins = [0, 0, 0, 0];
  }
}
