import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddLandmarkPage } from './add-landmark.page';

const routes: Routes = [
  {
    path: '',
    component: AddLandmarkPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddLandmarkPageRoutingModule {}
