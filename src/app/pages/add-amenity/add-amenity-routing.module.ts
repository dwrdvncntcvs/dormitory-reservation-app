import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddAmenityPage } from './add-amenity.page';

const routes: Routes = [
  {
    path: '',
    component: AddAmenityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddAmenityPageRoutingModule {}
