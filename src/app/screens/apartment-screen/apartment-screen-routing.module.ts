import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApartmentScreenPage } from './apartment-screen.page';

const routes: Routes = [
  {
    path: '',
    component: ApartmentScreenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApartmentScreenPageRoutingModule {}
