import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResolverPage } from './resolver.page';

const routes: Routes = [
  {
    path: '',
    component: ResolverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResolverPageRoutingModule {}
