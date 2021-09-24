import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateDormitoryPageRoutingModule } from './create-dormitory-routing.module';

import { CreateDormitoryPage } from './create-dormitory.page';
import { SharedModule } from 'src/app/components/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateDormitoryPageRoutingModule,
    SharedModule
  ],
  declarations: [CreateDormitoryPage]
})
export class CreateDormitoryPageModule {}
