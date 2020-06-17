import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkillListRoutingModule } from './skill-list-routing.module';
import { SkillListComponent } from './skill-list/skill-list.component';
import { SkillListCardComponent } from './skill-list-card/skill-list-card.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { SkillListFileterComponent } from './skill-list-fileter/skill-list-fileter.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    SkillListComponent,
    SkillListCardComponent,
    SkillListFileterComponent,
  ],
  imports: [
    CommonModule,
    SkillListRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    MatListModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatIconModule,
    MatButtonModule,
  ],
})
export class SkillListModule {}
