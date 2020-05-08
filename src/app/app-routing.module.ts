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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
