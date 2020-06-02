import { Component, OnInit } from '@angular/core';
import { AggregationResult } from 'src/app/interfaces/aggregation-result';
import { AggregationResultService } from 'src/app/services/aggregation-result.service';
import { Observable } from 'rxjs';
import { Skill } from 'src/app/interfaces/skill';
import { SkillService } from 'src/app/services/skill.service';

@Component({
  selector: 'app-skill-list',
  templateUrl: './skill-list.component.html',
  styleUrls: ['./skill-list.component.scss'],
})
export class SkillListComponent implements OnInit {
  constructor(private skillService: SkillService) {}

  ngOnInit(): void {}

  // 暫定メソッド(ゆくゆくはAlgoliaにてデータ取得)
  getSkills(): Skill[] {
    return this.skillService.getSkills();
  }
}
