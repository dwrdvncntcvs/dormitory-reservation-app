import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DormitoryDetailPage } from './dormitory-detail.page';

const routes: Routes = [
  {
    path: '',
    component: DormitoryDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DormitoryDetailPageRoutingModule {}
