import { Component, OnInit, Input } from '@angular/core';
import { AggregationResult } from 'src/app/interfaces/aggregation-result';
import { SkillCategory } from 'src/app/interfaces/skill-category';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit {
  @Input() result: AggregationResult;
  @Input() rank: number;

  constructor() {}

  ngOnInit(): void {}

  getCategries(): SkillCategory[] {
    return []; // this.result.skill.categries;
  }
}
