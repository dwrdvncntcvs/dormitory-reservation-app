import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddLandmarkPageRoutingModule } from './add-landmark-routing.module';

import { AddLandmarkPage } from './add-landmark.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddLandmarkPageRoutingModule
  ],
  declarations: [AddLandmarkPage]
})
export class AddLandmarkPageModule {}
