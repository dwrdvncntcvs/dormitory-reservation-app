import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DormitoryDetailPageRoutingModule } from './dormitory-detail-routing.module';

import { DormitoryDetailPage } from './dormitory-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DormitoryDetailPageRoutingModule
  ],
  declarations: [DormitoryDetailPage]
})
export class DormitoryDetailPageModule {}
