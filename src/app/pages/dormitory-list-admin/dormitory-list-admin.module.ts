import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DormitoryListAdminPageRoutingModule } from './dormitory-list-admin-routing.module';

import { DormitoryListAdminPage } from './dormitory-list-admin.page';
import { SharedModule } from 'src/app/components/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DormitoryListAdminPageRoutingModule,
    SharedModule,
  ],
  declarations: [DormitoryListAdminPage]
})
export class DormitoryListAdminPageModule {}
