import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import algoliasearch, { SearchIndex } from 'algoliasearch/lite';
import { ChartData } from '../interfaces/chart-data';

const searchClient = algoliasearch(
  environment.algolia.appId,
  environment.algolia.searchKey
);

@Injectable({
  providedIn: 'root',
})
export class ScrapingDataService {
  private scrapingTargets = ['levtech']; // スクレイピング対象が増えたら追加していく

  // 最新のスクレイピングデータを保持するindex
  // (スクレイピング対象ごとに別のindexになっている)
  private scrapingDataIndices: SearchIndex[] = this.scrapingTargets.reduce(
    (arr, target) => {
      arr.push(searchClient.initIndex('scraping-data-' + target));
      return arr;
    },
    new Array<SearchIndex>()
  );

  readonly showPriceLevels: string[] = [
    '30万-',
    '40万-',
    '50万-',
    '60万-',
    '70万-',
    '80万-',
    '90万-',
    '100万-',
  ];

  constructor() {}

  // algoliaのfacetからチャート用のデータを取得
  // (ChartData.name=facetName, ChartData.value=dataCount)
  private async getChartDataMapFromFacets(
    scrapingTarget: string,
    skillId: string
  ): Promise<Map<string, ChartData>> {
    // Map<name, data>
    // スクレイピング対象ごとにindexが分かれているので、本mapで合算を保持する
    const chartDataMap = new Map<string, ChartData>();

    const results = await Promise.all(
      this.scrapingDataIndices.map((index) => {
        return index.searchForFacetValues(scrapingTarget, '', {
          maxFacetHits: 100,
          facetFilters: ['skillIds:' + skillId],
        });
      })
    );

    results.forEach((res) => {
      console.log(JSON.stringify(res));
      for (const facet of res.facetHits) {
        let chartData = chartDataMap.get(facet.value);
        if (!chartData) {
          chartData = { name: facet.value, value: 0 };
          chartDataMap.set(chartData.name, chartData);
        }
        chartData.value = chartData.value + facet.count;
      }
    });

    return chartDataMap;
  }

  public async getBreakdownChartData(
    breakdownTarget: string,
    skillId: string
  ): Promise<ChartData[]> {
    const chartDataMap = await this.getChartDataMapFromFacets(
      breakdownTarget,
      skillId
    );
    return Array.from(chartDataMap.values()).sort((a, b) => b.value - a.value);
  }

  public async getPriceLevelChartData(skillId: string): Promise<ChartData[]> {
    const chartDataMap = await this.getChartDataMapFromFacets(
      'priceLevel',
      skillId
    );

    const showChartDataArray: ChartData[] = [];

    // 件数が0件だったfacet(金額帯)も、value=0件で返す
    for (const priceLevel of this.showPriceLevels) {
      let chartData = chartDataMap.get(priceLevel);
      if (!chartData) {
        chartData = { name: priceLevel, value: 0 };
      }
      showChartDataArray.push(chartData);
    }

    return showChartDataArray;
  }
}
