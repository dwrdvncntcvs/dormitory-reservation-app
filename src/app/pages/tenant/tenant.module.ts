import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TenantPageRoutingModule } from './tenant-routing.module';

import { TenantPage } from './tenant.page';
import { SharedModule } from 'src/app/components/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TenantPageRoutingModule,
    SharedModule,
  ],
  declarations: [TenantPage],
})
export class TenantPageModule {}
