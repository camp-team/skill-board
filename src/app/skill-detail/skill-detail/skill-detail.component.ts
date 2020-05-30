import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AggregationResultService } from 'src/app/services/aggregation-result.service';
import { AggregationResult } from 'src/app/interfaces/aggregation-result';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

interface Tab {
  name: string;
  caption: string;
  icon: string;
}

@Component({
  selector: 'app-skill-detail',
  templateUrl: './skill-detail.component.html',
  styleUrls: ['./skill-detail.component.scss'],
})
export class SkillDetailComponent implements OnInit {
  skillId: string;
  result$: Observable<AggregationResult>;
  tabs: Tab[] = [
    {
      name: 'transition',
      caption: '推移',
      icon: 'show_chart',
    },
    {
      name: 'breakdown',
      caption: '内訳',
      icon: 'pie_chart',
    },
    {
      name: 'distribution',
      caption: '分布',
      icon: 'bar_chart',
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private resultService: AggregationResultService
  ) {}

  ngOnInit(): void {
    this.skillId = this.route.snapshot.paramMap.get('id');
    console.log('skillId:' + this.skillId);
    this.result$ = this.resultService.getResult(this.skillId).pipe(take(1));
    console.log('result:' + this.result$);
  }

  getActiveTab(): string {
    return this.route.snapshot.queryParamMap.get('tab');
  }
}
