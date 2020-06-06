import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkillListRoutingModule } from './skill-list-routing.module';
import { SkillListComponent } from './skill-list/skill-list.component';
import { SkillListCardComponent } from './skill-list-card/skill-list-card.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [SkillListComponent, SkillListCardComponent],
  imports: [
    CommonModule,
    SkillListRoutingModule,
    MatGridListModule,
    MatCardModule,
  ],
})
export class SkillListModule {}
