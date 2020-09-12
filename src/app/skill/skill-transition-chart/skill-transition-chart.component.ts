import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { SkillService } from 'src/app/services/skill.service';
import { Observable } from 'rxjs';
import { Skill } from 'src/app/interfaces/skill';
import { Chart, ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-skill-transition-chart',
  templateUrl: './skill-transition-chart.component.html',
  styleUrls: ['./skill-transition-chart.component.scss'],
})
export class SkillTransitionChartComponent implements OnInit, AfterViewInit {
  transitionSkills$: Observable<Skill[]>;

  @ViewChild('canvas')
  canvas: ElementRef;

  context: CanvasRenderingContext2D;
  chart: Chart;

  data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },

      {
        label: '# of Votes',
        data: [12, 1, 13, 15, 22, 6],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  options = {
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  constructor(private skillService: SkillService) {}

  ngOnInit(): void {
    this.transitionSkills$ = this.skillService.getTransitionSkills('java');
  }

  ngAfterViewInit() {
    this.context = this.canvas.nativeElement.getContext('2d');
    this.chart = new Chart(this.context, this.prepareChartConfig());
  }

  prepareChartConfig(): ChartConfiguration {
    console.log('prepareChartConfig');
    return {
      type: 'line',
      data: this.data,
      options: this.options,
    };
  }
}
