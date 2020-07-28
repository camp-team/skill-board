import { Component, OnInit, Input } from '@angular/core';
import { ChartDataGroup } from 'src/app/interfaces/chart-data-group';

@Component({
  selector: 'app-transition-chart',
  templateUrl: './transition-chart.component.html',
  styleUrls: ['./transition-chart.component.scss'],
})
export class TransitionChartComponent implements OnInit {
  @Input() height: number;

  @Input() chartDataGroups: ChartDataGroup[] = [];
  @Input() view: number[];

  // options
  @Input() legend = false;
  @Input() showLabels = true;
  @Input() animations = true;
  @Input() xAxis = true;
  @Input() yAxis = true;
  @Input() showGridLines = true;
  @Input() roundDomains = true;
  @Input() xAxisLabel = 'x';
  @Input() yAxisLabel = 'y';
  @Input() showYAxisLabel = true;
  @Input() showXAxisLabel = true;
  @Input() timeline = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
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
