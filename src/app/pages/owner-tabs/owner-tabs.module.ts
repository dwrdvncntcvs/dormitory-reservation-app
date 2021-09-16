import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OwnerTabsPageRoutingModule } from './owner-tabs-routing.module';

import { OwnerTabsPage } from './owner-tabs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OwnerTabsPageRoutingModule
  ],
  declarations: [OwnerTabsPage]
})
export class OwnerTabsPageModule {}
