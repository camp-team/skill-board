import { Component, OnInit, Input } from '@angular/core';
import { ChartData } from 'src/app/interfaces/chart-data';

@Component({
  selector: 'app-distribution-chart',
  templateUrl: './distribution-chart.component.html',
  styleUrls: ['./distribution-chart.component.scss'],
})
export class DistributionChartComponent implements OnInit {
  @Input() chartData: ChartData[] = [];
  @Input() view: number[] = [];

  // options
  @Input() showXAxis = true;
  @Input() showYAxis = true;
  @Input() gradient = false;
  @Input() showLegend = true;
  @Input() showXAxisLabel = true;
  @Input() xAxisLabel = 'x';
  @Input() showYAxisLabel = true;
  @Input() yAxisLabel = 'y';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  };

  constructor() {}

  ngOnInit(): void {}

  onSelect(event) {
    console.log(event);
  }
}
