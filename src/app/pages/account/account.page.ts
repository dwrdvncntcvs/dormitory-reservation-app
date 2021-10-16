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
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit = () => {};

  ionViewDidEnter = () => {
    this.getUserData();
  };

  getUserData = () => {
    return this.userService.userProfileRequest().then((response) => {
      console.log(response);
      response.subscribe((userProfile) => {
        console.log(userProfile);
        this.userData = userProfile['user'];
        console.log(this.userData);
      });
    });
  };

  openModal = async (pageToLoad) => {
    const modal = await this.modalController.create({
      component: pageToLoad,
    });
    modal.present();
  };

  signOutAction = () => {
    this.userService.logOutRequest();
    this.userData = !this.userData;
    this.router.navigate(['dormRes']);
  };
}
