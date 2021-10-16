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
  errorMessage: string;
  toggle: Boolean = false;

  credentials = {
    username: '',
    plainPassword: '',
  };

  constructor(
    private navParams: NavParams,
    private modalController: ModalController,
    private userService: UserService
  ) {}

  ionViewDidEnter = () => {
    this.checkRole();
    this.getErrorMessage();
    this.removeErrorMessage();
  };

  onToggle() {
    this.toggle = !this.toggle;
  }

  getErrorMessage() {
    this.userService.errorMessage.subscribe((data) => {
      this.errorMessage = data;
      this.toggle = true;
    });
  }

  removeErrorMessage = () => {
    setInterval(() => {
      this.errorMessage = null;
      this.toggle = false;
    }, 5000);
  };

  ngOnInit() {}

  closeModal() {
    this.errorMessage = null;
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
    this.userService.signInRequest(this.credentials, role);
  }
}
