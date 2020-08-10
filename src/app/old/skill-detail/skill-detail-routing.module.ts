import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SkillDetailComponent } from './skill-detail/skill-detail.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: SkillDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SkillDetailRoutingModule {}
