import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TenantTabsPageRoutingModule } from './tenant-tabs-routing.module';

import { TenantTabsPage } from './tenant-tabs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TenantTabsPageRoutingModule
  ],
  declarations: [TenantTabsPage]
})
export class TenantTabsPageModule {}
