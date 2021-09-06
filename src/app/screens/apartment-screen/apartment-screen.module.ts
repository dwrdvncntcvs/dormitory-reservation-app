import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApartmentScreenPageRoutingModule } from './apartment-screen-routing.module';

import { ApartmentScreenPage } from './apartment-screen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApartmentScreenPageRoutingModule
  ],
  declarations: [ApartmentScreenPage]
})
export class ApartmentScreenPageModule {}
