import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AggregationResultService } from 'src/app/services/aggregation-result.service';
import { AggregationResult } from 'src/app/interfaces/aggregation-result';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-skill-detail',
  templateUrl: './skill-detail.component.html',
  styleUrls: ['./skill-detail.component.scss'],
})
export class SkillDetailComponent implements OnInit {
  skillId: string;
  result$: Observable<AggregationResult>;

  constructor(
    private route: ActivatedRoute,
    private resultService: AggregationResultService
  ) {}

  ngOnInit(): void {
    console.log('ngOnInit');
    this.skillId = this.route.snapshot.paramMap.get('id');
    console.log('skillId:' + this.skillId);
    this.result$ = this.resultService.getResult(this.skillId);
    console.log('result:' + this.result$);
  }
}
