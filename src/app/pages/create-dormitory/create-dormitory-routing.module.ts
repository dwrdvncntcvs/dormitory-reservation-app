import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateDormitoryPage } from './create-dormitory.page';

const routes: Routes = [
  {
    path: '',
    component: CreateDormitoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateDormitoryPageRoutingModule {}
