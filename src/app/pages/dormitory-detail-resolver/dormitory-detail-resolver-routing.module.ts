import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DormitoryDetailResolverPage } from './dormitory-detail-resolver.page';

const routes: Routes = [
  {
    path: '',
    component: DormitoryDetailResolverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DormitoryDetailResolverPageRoutingModule {}
