import { Component, OnInit, Input } from '@angular/core';
import { Skill } from 'src/app/interfaces/skill';
import { ScrapingDataService } from 'src/app/services/scraping-data.service';
import { ChartData } from 'src/app/interfaces/chart-data';

@Component({
  selector: 'app-skill-detail-distribution',
  templateUrl: './skill-detail-distribution.component.html',
  styleUrls: ['./skill-detail-distribution.component.scss'],
})
export class SkillDetailDistributionComponent implements OnInit {
  @Input() skill: Skill;

  chartData: Promise<ChartData[]>;

  constructor(private scrapingDataService: ScrapingDataService) {}

  ngOnInit(): void {
    this.chartData = this.scrapingDataService.getPriceLevelChartData(
      this.skill.skillId
    );
  }
}
