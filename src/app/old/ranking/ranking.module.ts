import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RankingRoutingModule } from './ranking-routing.module';
import { RankingComponent } from './ranking/ranking.component';
import { ResultComponent } from './result/result.component';
import { SharedModule } from '../../shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [RankingComponent, ResultComponent],
  imports: [
    CommonModule,
    RankingRoutingModule,
    SharedModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class RankingModule {}
