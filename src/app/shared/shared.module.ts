import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterFormComponent } from './filter-form/filter-form.component';
import { BannerComponent } from './banner/banner.component';
import { ResultToSkillPipe } from '../pipes/result-to-skill.pipe';

@NgModule({
  declarations: [FilterFormComponent, BannerComponent, ResultToSkillPipe],
  imports: [CommonModule],
  exports: [FilterFormComponent, BannerComponent, ResultToSkillPipe],
})
export class SharedModule {}
