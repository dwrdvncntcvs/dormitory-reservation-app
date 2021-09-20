import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DormitoryListPageRoutingModule } from './dormitory-list-routing.module';

import { DormitoryListPage } from './dormitory-list.page';
import { SharedModule } from 'src/app/components/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DormitoryListPageRoutingModule,
    SharedModule
  ],
  declarations: [DormitoryListPage]
})
export class DormitoryListPageModule {}
