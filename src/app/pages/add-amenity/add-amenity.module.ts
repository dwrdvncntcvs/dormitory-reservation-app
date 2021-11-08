import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddAmenityPageRoutingModule } from './add-amenity-routing.module';

import { AddAmenityPage } from './add-amenity.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddAmenityPageRoutingModule
  ],
  declarations: [AddAmenityPage]
})
export class AddAmenityPageModule {}
