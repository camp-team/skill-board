import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  // ミニマム構成の時点では、rankingページをトップページとする
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('./ranking/ranking.module').then((m) => m.RankingModule),
  },

  {
    path: 'skill',
    loadChildren: () =>
      import('./skill-list/skill-list.module').then((m) => m.SkillListModule),
  },

  {
    path: 'skill/:id',
    loadChildren: () =>
      import('./skill-detail/skill-detail.module').then(
        (m) => m.SkillDetailModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
