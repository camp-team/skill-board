import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkillRoutingModule } from './skill-routing.module';
import { SkillComponent } from './skill/skill.component';

@NgModule({
  declarations: [SkillComponent],
  imports: [CommonModule, SkillRoutingModule],
})
export class SkillModule {}
