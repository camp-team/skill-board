import { Component, OnInit } from '@angular/core';
import { AggregationResultService } from 'src/app/services/aggregation-result.service';
import { AggregationResult } from 'src/app/interfaces/aggregation-result';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss'],
})
export class RankingComponent implements OnInit {
  results$: Observable<AggregationResult[]> = this.resultService.getResults();

  constructor(private resultService: AggregationResultService) {}

  ngOnInit(): void {}
}
