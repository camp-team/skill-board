import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkillDetailRoutingModule } from './skill-detail-routing.module';
import { SkillDetailComponent } from './skill-detail/skill-detail.component';
import { SharedModule } from '../../shared/shared.module';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { SkillDetailDistributionComponent } from './skill-detail-distribution/skill-detail-distribution.component';
import { SkillDetailBreakdownComponent } from './skill-detail-breakdown/skill-detail-breakdown.component';
import { SkillDetailTransitionComponent } from './skill-detail-transition/skill-detail-transition.component';

@NgModule({
  declarations: [
    SkillDetailComponent,
    SkillDetailDistributionComponent,
    SkillDetailBreakdownComponent,
    SkillDetailTransitionComponent,
  ],
  imports: [
    CommonModule,
    SkillDetailRoutingModule,
    SharedModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
  ],
})
export class SkillDetailModule {}
