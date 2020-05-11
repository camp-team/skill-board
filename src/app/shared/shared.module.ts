import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterFormComponent } from './filter-form/filter-form.component';
import { BannerComponent } from './banner/banner.component';

@NgModule({
  declarations: [FilterFormComponent, BannerComponent],
  imports: [CommonModule],
  exports: [FilterFormComponent, BannerComponent],
})
export class SharedModule {}
