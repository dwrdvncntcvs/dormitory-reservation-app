import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SignInPage } from '../sign-in/sign-in.page';

@Component({
  selector: 'app-sign-in-as',
  templateUrl: './sign-in-as.page.html',
  styleUrls: ['./sign-in-as.page.scss'],
})
export class SignInAsPage implements OnInit {
  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  async openModal(role) {
    this.modalController.dismiss();
    const modal = await this.modalController.create({
      component: SignInPage,
      componentProps: {
        role,
      },
      cssClass: 'rounded-edges-modal'
    });
    modal.present();
  }

  closeModal() {
    this.modalController.dismiss();
  }
}
