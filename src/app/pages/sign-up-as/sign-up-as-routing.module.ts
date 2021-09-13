import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignUpAsPage } from './sign-up-as.page';

const routes: Routes = [
  {
    path: '',
    component: SignUpAsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignUpAsPageRoutingModule {}
