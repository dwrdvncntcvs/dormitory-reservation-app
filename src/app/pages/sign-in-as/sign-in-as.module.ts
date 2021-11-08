import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignInAsPageRoutingModule } from './sign-in-as-routing.module';

import { SignInAsPage } from './sign-in-as.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignInAsPageRoutingModule
  ],
  declarations: [SignInAsPage]
})
export class SignInAsPageModule {}
