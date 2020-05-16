import { Component, OnInit, Input } from '@angular/core';
import { AggregationResult } from 'src/app/interfaces/aggregation-result';

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

  getSkillCategries(): string[] {
    return this.result.skillCategories;
  }
}
