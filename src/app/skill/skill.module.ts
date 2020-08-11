import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { SkillRoutingModule } from './skill-routing.module';
import { SkillComponent } from './skill/skill.component';
import { SkillPillComponent } from './skill-pill/skill-pill.component';
import { SkillPillControlDirective } from './skill-pill/skill-pill-control.directive';

@NgModule({
  declarations: [SkillComponent, SkillPillComponent, SkillPillControlDirective],
  imports: [
    CommonModule,
    SkillRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
  ],
})
export class SkillModule {}
