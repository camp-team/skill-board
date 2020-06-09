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
    dateFormat = 'yy/MM'
  ): ChartDataGroup[] {
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
        name: formatDate(result.aggregatedAt.toDate(), dateFormat, this.locale),
        value: this.getChartValue(result, valueType),
      };
      chartDataGroup.series.push(chartData);
    });
    return chartDataGroups;
  }

  private getChartValue(result: Skill, valueType: string): number {
    switch (valueType) {
      case 'price':
        console.log('price');
        return result.price;
      case 'vacancy':
        console.log('vacancy');
        return result.vacancy;
      default:
        return 0;
    }
  }
}
