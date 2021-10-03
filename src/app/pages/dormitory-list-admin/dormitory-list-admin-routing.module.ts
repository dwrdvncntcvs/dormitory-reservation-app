import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DormitoryListAdminPage } from './dormitory-list-admin.page';

const routes: Routes = [
  {
    path: '',
    component: DormitoryListAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DormitoryListAdminPageRoutingModule {}
