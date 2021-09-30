
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { IonicModule } from '@ionic/angular';
import { AdminProfileComponent } from '../admin-profile/admin-profile.component';



@NgModule({
  declarations: [
    HeaderComponent,
    AdminProfileComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    HeaderComponent,
    AdminProfileComponent
  ]
})
export class SharedModule { }
