import { Pipe, PipeTransform } from '@angular/core';
import { AggregationResult } from '../interfaces/aggregation-result';
import { ChartData } from '../interfaces/chart-data';
import { SkillService } from '../services/skill.service';
import { DatePipe } from '@angular/common';
import { ResultToSkillPipe } from './result-to-skill.pipe';

@Pipe({
  name: 'resultToChartData',
})
export class ResultToChartDataPipe implements PipeTransform {
  constructor(
    private datePipe: DatePipe,
    private resultToSkillPipe: ResultToSkillPipe
  ) {}

  transform(results: AggregationResult[]): ChartData[] {
    const chartDataArr: ChartData[] = [];
    results.forEach((result) => {
      const chartData: ChartData = {
        name: this.resultToSkillPipe.transform(result).skillId,
        value: this.datePipe.transform(result.price), // とりあえずprice固定。 引数で求人数とかにも切り替えするか？
      };
      chartDataArr.push(chartData);
    });
    return chartDataArr;
  }
}
