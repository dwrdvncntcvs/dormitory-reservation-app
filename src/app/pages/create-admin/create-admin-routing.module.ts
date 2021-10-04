import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateAdminPage } from './create-admin.page';

const routes: Routes = [
  {
    path: '',
    component: CreateAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateAdminPageRoutingModule {}
