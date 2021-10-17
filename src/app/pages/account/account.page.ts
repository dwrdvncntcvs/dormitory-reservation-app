import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { SignInAsPage } from '../sign-in-as/sign-in-as.page';
import { SignUpAsPage } from '../sign-up-as/sign-up-as.page';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  userData;

  signInAs = SignInAsPage;
  signUpAs = SignUpAsPage;

  constructor(
    private modalController: ModalController,
  ) {}

  ngOnInit = () => {};

  openModal = async (pageToLoad) => {
    const modal = await this.modalController.create({
      component: pageToLoad,
    });
    modal.present();
  };
}
