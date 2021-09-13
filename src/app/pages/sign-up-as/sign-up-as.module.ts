import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignUpAsPageRoutingModule } from './sign-up-as-routing.module';

import { SignUpAsPage } from './sign-up-as.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignUpAsPageRoutingModule
  ],
  declarations: [SignUpAsPage]
})
export class SignUpAsPageModule {}
