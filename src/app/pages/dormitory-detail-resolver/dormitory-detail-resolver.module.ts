import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DormitoryDetailResolverPageRoutingModule } from './dormitory-detail-resolver-routing.module';

import { DormitoryDetailResolverPage } from './dormitory-detail-resolver.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DormitoryDetailResolverPageRoutingModule
  ],
  declarations: [DormitoryDetailResolverPage]
})
export class DormitoryDetailResolverPageModule {}
