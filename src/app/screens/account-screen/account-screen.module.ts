import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountScreenPageRoutingModule } from './account-screen-routing.module';

import { AccountScreenPage } from './account-screen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountScreenPageRoutingModule
  ],
  declarations: [AccountScreenPage]
})
export class AccountScreenPageModule {}
