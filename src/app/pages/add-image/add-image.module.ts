import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddImagePageRoutingModule } from './add-image-routing.module';

import { AddImagePage } from './add-image.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddImagePageRoutingModule
  ],
  declarations: [AddImagePage]
})
export class AddImagePageModule {}
