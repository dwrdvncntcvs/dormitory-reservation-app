import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResolverPageRoutingModule } from './resolver-routing.module';

import { ResolverPage } from './resolver.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResolverPageRoutingModule
  ],
  declarations: [ResolverPage]
})
export class ResolverPageModule {}
