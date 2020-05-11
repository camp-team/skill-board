import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RankingRoutingModule } from './ranking-routing.module';
import { RankingComponent } from './ranking/ranking.component';
import { ResultComponent } from './result/result.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [RankingComponent, ResultComponent],
  imports: [CommonModule, RankingRoutingModule, SharedModule],
})
export class RankingModule {}
