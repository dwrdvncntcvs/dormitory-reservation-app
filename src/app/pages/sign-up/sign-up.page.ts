import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { SignInPage } from '../sign-in/sign-in.page';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  displayRole: string;
  role: any;
  toggle = false;

  userForm = {
    name: '',
    username: '',
    email: '',
    plainPassword: '',
    plainConfirmPassword: '',
    contactNumber: '',
    address: '',
    gender: '',
  };

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private userService: UserService,
    private router: Router
  ) {
    this.checkRole();
  }

  ngOnInit() {}

  useToggle() {
    this.toggle = !this.toggle;
  }

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

  async openModal(role) {
    const modal = await this.modalController.create({
      component: SignInPage,
      componentProps: {
        role,
      },
    });
    modal.present();
  }

  signUpAction(role) {
    return this.userService
      .signUpRequest(this.userForm, role)
      .subscribe((response) => {
        console.log(response);
        this.closeModal();
        this.openModal(role)
      });
  }
}
