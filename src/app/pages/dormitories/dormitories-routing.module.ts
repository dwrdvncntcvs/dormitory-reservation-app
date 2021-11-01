import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DormitoriesPage } from './dormitories.page';

const routes: Routes = [
  {
    path: '',
    component: DormitoriesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DormitoriesPageRoutingModule {}
