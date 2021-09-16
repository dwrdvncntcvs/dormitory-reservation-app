import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DormitoryListPageRoutingModule } from './dormitory-list-routing.module';

import { DormitoryListPage } from './dormitory-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DormitoryListPageRoutingModule
  ],
  declarations: [DormitoryListPage]
})
export class DormitoryListPageModule {}
