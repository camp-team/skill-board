import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SkillRoutingModule } from './skill-routing.module';
import { SkillComponent } from './skill/skill.component';
import { SkillPillComponent } from './skill-pill/skill-pill.component';
import { SkillSearchPillComponent } from './skill-search-pill/skill-search-pill.component';

@NgModule({
  declarations: [SkillComponent, SkillPillComponent, SkillSearchPillComponent],
  imports: [
    CommonModule,
    SkillRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SkillModule {}
