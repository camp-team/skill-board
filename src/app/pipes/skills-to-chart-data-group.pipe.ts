import { Pipe, PipeTransform, LOCALE_ID, Inject } from '@angular/core';
import { ChartData } from '../interfaces/chart-data';
import { ChartDataGroup } from '../interfaces/chart-data-group';
import { formatDate } from '@angular/common';
import { Skill } from '../interfaces/skill';

@Pipe({
  name: 'skillsToChartDataGroup',
})
export class SkillsToChartDataGroupPipe implements PipeTransform {
  constructor(@Inject(LOCALE_ID) private locale: string) {
    console.log('locale:' + locale);
  }

  transform(
    results: Skill[],
    valueType: 'price' | 'vacancy',
    dateFormat = 'yy/MM/dd'
  ): ChartDataGroup[] {
    if (!results) {
      return [];
    }

    const chartDataGroups: ChartDataGroup[] = [];
    results.forEach((result) => {
      let chartDataGroup = chartDataGroups.find(
        (g) => g.name === result.skillId
      );
      if (!chartDataGroup) {
        chartDataGroup = {
          name: result.skillId,
          series: [],
        };
        chartDataGroups.push(chartDataGroup);
      }

      const chartData: ChartData = {
        name: this.aggregatedDateFormat(dateFormat, result.aggregatedDate),
        value: this.getChartValue(result, valueType),
      };
      chartDataGroup.series.push(chartData);
    });
    return chartDataGroups;
  }

  private aggregatedDateFormat(dateFormat: string, num: number): string {
    // num(aggregatedDate)は、yyyymmdd形式の8桁数字なので、一旦Dateにして任意の形式でフォーマット
    const y = num / 10000;
    const m = (num % 10000) / 100;
    const d = num % 100;
    const aggregatedDate = new Date(y, m - 1, d);
    return formatDate(aggregatedDate, dateFormat, this.locale);
  }

  private getChartValue(result: Skill, valueType: string): number {
    switch (valueType) {
      case 'price':
        return result.price;
      case 'vacancy':
        return result.vacancy;
      default:
        return 0;
    }
  }
}
