import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddDocumentPage } from './add-document.page';

const routes: Routes = [
  {
    path: '',
    component: AddDocumentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddDocumentPageRoutingModule {}
