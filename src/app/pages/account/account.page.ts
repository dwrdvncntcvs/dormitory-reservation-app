import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SignInAsPage } from '../sign-in-as/sign-in-as.page';
import { SignUpAsPage } from '../sign-up-as/sign-up-as.page';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  signInAs = SignInAsPage;
  signUpAs = SignUpAsPage;

  constructor(
    private modalController: ModalController,
  ) { }

  ngOnInit() {
  }

  async openModal(pageToLoad) {
    const modal = await this.modalController.create({
      component: pageToLoad,
    });
    modal.present();
  }
}
