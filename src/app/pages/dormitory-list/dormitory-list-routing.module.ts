import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DormitoryListPage } from './dormitory-list.page';

const routes: Routes = [
  {
    path: '',
    component: DormitoryListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DormitoryListPageRoutingModule {}
