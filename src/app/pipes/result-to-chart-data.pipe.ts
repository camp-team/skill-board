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
  constructor() {}

  transform(results: AggregationResult[]): ChartData[] {
    const chartDataArr: ChartData[] = [];
    results.forEach((result) => {
      // とりあえずprice固定。 引数で求人数とかにも切り替えするか？
      // name: this.resultToSkillPipe.transform(result).skillId,
      const chartData: ChartData = {
        name: result.skillId,
        value: result.price.toString(),
      };
      chartDataArr.push(chartData);
    });
    return chartDataArr;
  }
}
