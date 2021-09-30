import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.page.html',
  styleUrls: ['./admin-login.page.scss'],
})
export class AdminLoginPage implements OnInit {
  errorMessage: string;

  credentials = {
    username: '',
    plainPassword: '',
  };

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit = () => {};

  ionViewWillLeave = () => {
    this.errorMessage = null;
  };

  signInAction = (role) => {
    console.log(this.credentials);
    console.log(role);
    const credentials = this.credentials;

    this.userService.signInRequest(credentials, role);

    this.credentials.username = '';
    this.credentials.plainPassword = '';

    this.userService.errorMessage.subscribe((err) => {
      this.errorMessage = err;
    });
  };
}
