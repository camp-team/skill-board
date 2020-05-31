import { Component, OnInit, Input } from '@angular/core';
import { ChartData } from '../../../interfaces/chart-data';

@Component({
  selector: 'app-transition-chart',
  templateUrl: './transition-chart.component.html',
  styleUrls: ['./transition-chart.component.scss'],
})
export class TransitionChartComponent implements OnInit {
  @Input() chartData: ChartData[];
  view: any[] = [700, 300];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'month';
  yAxisLabel: string = 'price';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  };

  constructor() {}

  ngOnInit(): void {
    console.log('onInit');
  }

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
