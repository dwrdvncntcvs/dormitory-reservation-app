import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  displayRole: string;
  role: string;

  credentials = {
    username: '',
    plainPassword: '',
  };

  constructor(
    private navParams: NavParams,
    private modalController: ModalController,
    private userService: UserService
  ) {
    this.checkRole();
  }

  ngOnInit() {}

  closeModal() {
    this.modalController.dismiss();
  }

  checkRole() {
    this.role = this.navParams.get('role');
    if (this.role === 'owner') {
      this.displayRole = 'Owner';
    } else if (this.role === 'tenant') {
      this.displayRole = 'Tenant';
    }
  }

  //Sample
  signInAction(role) {
    return this.userService.signInRequest(this.credentials, role);
  }
}
