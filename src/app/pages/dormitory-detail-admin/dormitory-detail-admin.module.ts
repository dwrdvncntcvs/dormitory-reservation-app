import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DormitoryDetailAdminPageRoutingModule } from './dormitory-detail-admin-routing.module';

import { DormitoryDetailAdminPage } from './dormitory-detail-admin.page';
import { SharedModule } from 'src/app/components/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DormitoryDetailAdminPageRoutingModule,
    SharedModule
  ],
  declarations: [DormitoryDetailAdminPage]
})
export class DormitoryDetailAdminPageModule {}
