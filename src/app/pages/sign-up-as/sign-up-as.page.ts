import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SignUpPage } from '../sign-up/sign-up.page';

@Component({
  selector: 'app-sign-up-as',
  templateUrl: './sign-up-as.page.html',
  styleUrls: ['./sign-up-as.page.scss'],
})
export class SignUpAsPage implements OnInit {

  constructor(
    private modalController: ModalController,
  ) { }

  ngOnInit() {
  }

  async openModal(role) {
    this.modalController.dismiss();
    const modal = await this.modalController.create({
      component: SignUpPage,
      componentProps: {
        role
      }
    });
    modal.present();
  }

  closeModal() {
    this.modalController.dismiss();
  }
}
