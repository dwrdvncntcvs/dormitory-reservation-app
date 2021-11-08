import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddImagePage } from './add-image.page';

const routes: Routes = [
  {
    path: '',
    component: AddImagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddImagePageRoutingModule {}
