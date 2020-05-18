import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkillRoutingModule } from './skill-routing.module';
import { SkillListComponent } from './skill-list/skill-list.component';
import { SkillDetailComponent } from './skill-detail/skill-detail.component';

@NgModule({
  declarations: [SkillListComponent, SkillDetailComponent],
  imports: [CommonModule, SkillRoutingModule],
})
export class SkillModule {}
