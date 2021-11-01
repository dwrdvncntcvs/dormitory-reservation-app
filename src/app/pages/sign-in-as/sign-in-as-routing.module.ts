import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignInAsPage } from './sign-in-as.page';

const routes: Routes = [
  {
    path: '',
    component: SignInAsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignInAsPageRoutingModule {}
