import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkillDetailRoutingModule } from './skill-detail-routing.module';
import { SkillDetailComponent } from './skill-detail/skill-detail.component';
import { SharedModule } from '../shared/shared.module';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { SkillDetailDistributionComponent } from './skill-detail-distribution/skill-detail-distribution.component';
import { SkillDetailBreakdownComponent } from './skill-detail-breakdown/skill-detail-breakdown.component';
import { SkillDetailTransitionComponent } from './skill-detail-transition/skill-detail-transition.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TransitionChartComponent } from './skill-detail-transition/transition-chart/transition-chart.component';

@NgModule({
  declarations: [
    SkillDetailComponent,
    SkillDetailDistributionComponent,
    SkillDetailBreakdownComponent,
    SkillDetailTransitionComponent,
    TransitionChartComponent,
  ],
  imports: [
    CommonModule,
    SkillDetailRoutingModule,
    SharedModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    NgxChartsModule,
    BrowserAnimationsModule,
  ],
})
export class SkillDetailModule {}
