import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Input,
} from '@angular/core';
import { SkillService } from 'src/app/services/skill.service';
import {
  Chart,
  ChartConfiguration,
  ChartOptions,
  ChartData,
  ChartDataSets,
} from 'chart.js';
import { SkillDataModel } from '../model/skill-data.model';
import { Observable, concat, forkJoin } from 'rxjs';
import { Skill } from 'src/app/interfaces/skill';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-skill-transition-chart',
  templateUrl: './skill-transition-chart.component.html',
  styleUrls: ['./skill-transition-chart.component.scss'],
})
export class SkillTransitionChartComponent implements OnInit, AfterViewInit {
  @Input()
  skills: ReadonlyArray<SkillDataModel>;

  @ViewChild('canvas')
  private canvas: ElementRef;

  private context: CanvasRenderingContext2D;
  private chart: Chart;

  data: ChartData = {};
  // {
  //   labels: ['8/3', '8/10', '8/17', '8/24', '8/31', '9/7'],
  //   datasets: [
  //     {
  //       label: 'JAVA',
  //       data: [573389, 753389, 673389, 657338, 575338, 567338],
  //       borderColor: ['#0096EF'],
  //       fill: false,
  //       lineTension: 0,
  //     },

  //     {
  //       label: 'Ruby',
  //       data: [763114, 763114, 733819, 715338, 753389, 693389],
  //       borderColor: ['#FF443E'],
  //       fill: false,
  //       lineTension: 0,
  //     },
  //   ],
  // };

  options: ChartOptions = {
    maintainAspectRatio: false,
    legend: {
      position: 'bottom',
    },
    scales: {
      yAxes: [
        {
          ticks: {
            // beginAtZero: true,
          },
        },
      ],
    },
  };

  constructor(private skillService: SkillService) {}

  ngOnInit(): void {
    // console.log('ngOnInit');
    // console.log(JSON.stringify(this.skills));
    // console.log('Promise.all.end');
  }

  async ngAfterViewInit() {
    console.log('ngAfterViewInit');

    try {
      for (const s of this.skills) {
        console.log('for:' + s.skillId);
        const skillHistories: Skill[] = await this.skillService
          .getSkillHistories(s.skillId)
          .pipe(take(1))
          .toPromise();
        for (const skillHis of skillHistories) {
          console.log('skillHis' + JSON.stringify(skillHis));
        }
      }
    } catch (error) {
      console.log(error);
    }

    // this.skills.forEach((s) =>
    //   this.skillService.getSkillHistories(s.skillId).toPromise()
    // );

    // const joinObs = forkJoin(skillHistories);
    // joinObs
    //   .pipe(take(1))
    //   .subscribe((o) => console.log('fork:' + JSON.stringify(o)));

    // console.log('chartDataSetsArray:' + JSON.stringify(chartDataSetsArray));

    console.log('ngAfterViewInit.end');

    // const promises: Promise<ChartDataSets>[] = this.skills.map((s) =>
    //   this.skillService
    //     .getSkillHistories(s.skillId)
    //     .pipe(
    //       map((histories) => {
    //         console.log('pipe.map');
    //         console.log('histories:' + JSON.stringify(histories));

    //         const priceArray: number[] = histories.map((h) => h.price);
    //         const chartDataSets: ChartDataSets = {
    //           label: s.skillCaption,
    //           borderColor: s.skillColor,
    //           fill: false,
    //           lineTension: 0,
    //           data: priceArray,
    //         };
    //         console.log('pipe.map.return');
    //         return chartDataSets;
    //       })
    //     )
    //     .toPromise()
    // );

    // const promises: Promise<ChartDataSets>[] = [];
    // this.skills.forEach((s) => {
    //   promises.push(
    //     this.skillService
    //       .getSkillHistories(s.skillId)
    //       .pipe(
    //         map((histories) => {
    //           console.log('pipe.map');
    //           console.log('histories:' + JSON.stringify(histories));

    //           const priceArray: number[] = histories.map((h) => h.price);
    //           const chartDataSets: ChartDataSets = {
    //             label: s.skillCaption,
    //             borderColor: s.skillColor,
    //             fill: false,
    //             lineTension: 0,
    //             data: priceArray,
    //           };
    //           console.log('pipe.map.return');
    //           return chartDataSets;
    //         })
    //       )
    //       .toPromise()
    //   );
    // });

    // Promise.all(promises).then((results) => console.log('Promise.all.exec'));

    // console.log('Promise.all.exec');
    // Promise.all(promises)
    //   .then((results) => {
    //     console.log('promiss.then');
    //     console.log('results:' + JSON.stringify(results));

    //     this.data = {
    //       labels: ['8/3', '8/10', '8/17', '8/24', '8/31', '9/7'],
    //       datasets: results,
    //     };

    //     console.log('this.data' + JSON.stringify(this.data));
    //     this.context = this.canvas.nativeElement.getContext('2d');
    //     this.chart = new Chart(this.context, this.prepareChartConfig());
    //   })
    //   .catch((error) => {
    //     console.log(error.message);
    //   });

    // this.context = this.canvas.nativeElement.getContext('2d');
    // this.chart = new Chart(this.context, this.prepareChartConfig());
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
