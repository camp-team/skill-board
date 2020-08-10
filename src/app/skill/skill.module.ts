import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { SkillRoutingModule } from './skill-routing.module';
import { SkillComponent } from './skill/skill.component';
import { SkillPillComponent } from './skill-pill/skill-pill.component';

@NgModule({
  declarations: [SkillComponent, SkillPillComponent],
  imports: [
    CommonModule,
    SkillRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
  ],
})
export class SkillModule {}
