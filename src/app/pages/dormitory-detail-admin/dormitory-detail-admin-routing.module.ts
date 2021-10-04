import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DormitoryDetailAdminPage } from './dormitory-detail-admin.page';

const routes: Routes = [
  {
    path: '',
    component: DormitoryDetailAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DormitoryDetailAdminPageRoutingModule {}
