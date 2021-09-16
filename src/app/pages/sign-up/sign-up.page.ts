import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

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
    email: '',
    plainPassword: '',
    confirmPlainPassword: '',
    contactNumber: '',
    address: '',
    gender: '',
  };

  constructor(
    private modalController: ModalController,
    private navParams: NavParams
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

  signUpAction(role) {
    console.log('User Form: ' + JSON.stringify(this.userForm));
    console.log('Role: ' + role);
  }
}
