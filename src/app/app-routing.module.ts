import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'skill',
    loadChildren: () =>
      import('./skill/skill.module').then((m) => m.SkillModule),
  },

  // 以下、リニューアル前ページ。リニューアル後に削除
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('./old/ranking/ranking.module').then((m) => m.RankingModule),
  },
  {
    path: 'old/skill',
    loadChildren: () =>
      import('./old/skill-list/skill-list.module').then(
        (m) => m.SkillListModule
      ),
  },
  {
    path: 'old/skill/:id',
    loadChildren: () =>
      import('./old/skill-detail/skill-detail.module').then(
        (m) => m.SkillDetailModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
