import { Component, OnInit, Input } from '@angular/core';
import { Skill } from 'src/app/interfaces/skill';
import { ScrapingDataService } from 'src/app/services/scraping-data.service';
import { ChartData } from 'src/app/interfaces/chart-data';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-skill-detail-breakdown',
  templateUrl: './skill-detail-breakdown.component.html',
  styleUrls: ['./skill-detail-breakdown.component.scss'],
})
export class SkillDetailBreakdownComponent implements OnInit {
  @Input() skill: Skill;

  prefecturesChartData: Promise<ChartData[]>;

  constructor(private scrapingDataService: ScrapingDataService) {}

  ngOnInit(): void {
    this.prefecturesChartData = this.scrapingDataService.getBreakdownChartData(
      'prefectures',
      this.skill.skillId
    );
  }
}
