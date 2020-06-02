import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkillListRoutingModule } from './skill-list-routing.module';
import { SkillListComponent } from './skill-list/skill-list.component';
import { SkillListCardComponent } from './skill-list-card/skill-list-card.component';

@NgModule({
  declarations: [SkillListComponent, SkillListCardComponent],
  imports: [CommonModule, SkillListRoutingModule],
})
export class SkillListModule {}
