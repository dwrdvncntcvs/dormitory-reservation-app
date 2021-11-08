import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DormitoriesPageRoutingModule } from './dormitories-routing.module';

import { DormitoriesPage } from './dormitories.page';
import { SharedModule } from 'src/app/components/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DormitoriesPageRoutingModule,
    SharedModule
  ],
  declarations: [DormitoriesPage]
})
export class DormitoriesPageModule {}
