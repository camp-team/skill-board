import { Component, OnInit, Input } from '@angular/core';
import { ChartData } from 'src/app/interfaces/chart-data';

@Component({
  selector: 'app-breakdown-chart',
  templateUrl: './breakdown-chart.component.html',
  styleUrls: ['./breakdown-chart.component.scss'],
})
export class BreakdownChartComponent implements OnInit {
  @Input() height: number;

  @Input() chartData: ChartData[] = [];
  @Input() view: number[] = [];

  // options
  @Input() gradient = true;
  @Input() showLegend = true;
  @Input() showLabels = true;
  @Input() isDoughnut = false;
  @Input() legendPosition = 'right';
  @Input() legendTitle = 'legend';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  };

  constructor() {}

  ngOnInit(): void {}

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
