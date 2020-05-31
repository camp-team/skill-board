import { Component, OnInit, Input } from '@angular/core';
import { Skill } from 'src/app/interfaces/skill';
import { AggregationResultService } from 'src/app/services/aggregation-result.service';
import { AggregationResult } from 'src/app/interfaces/aggregation-result';

@Component({
  selector: 'app-skill-detail-transition',
  templateUrl: './skill-detail-transition.component.html',
  styleUrls: ['./skill-detail-transition.component.scss'],
})
export class SkillDetailTransitionComponent implements OnInit {
  @Input() skill: Skill;

  transitionResults: AggregationResult[] = [];

  constructor(private resultService: AggregationResultService) {}

  ngOnInit(): void {
    console.log('onInit');
    this.transitionResults = this.resultService.getTransitionResult(
      this.skill.skillId
    );
    console.log(this.transitionResults);
  }
}
