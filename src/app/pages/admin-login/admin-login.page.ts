import { Storage } from '@ionic/storage';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

const USER_TOKEN_KEY = 'user_token';

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

  constructor(
    private userService: UserService,
    private router: Router,
    private storage: Storage
  ) {}

  ngOnInit = () => {};

  ionViewWillLeave = () => {
    this.errorMessage = null;
  };

  signInAction = (role) => {
    console.log(this.credentials);
    console.log(role);
    const credentials = this.credentials;

    this.userService.signInRequest(credentials, role).then((response) => {
      response.subscribe(
        async (token) => {
          const response_token = token['token'];
          console.log(response_token);
          this.storage.set(USER_TOKEN_KEY, response_token);
          this.router.navigateByUrl('/administrator/admin-home');
          this.credentials.username = '';
          this.credentials.plainPassword = '';
        },
        (error) => {
          console.log(error);
          const err = error['error'].msg;
          if (err === 'Invalid Inputs') {
            this.errorMessage = 'Please enter your correct credntials';
          } else {
            this.errorMessage = err;
          }
          setTimeout(() => {
            this.errorMessage = null;
          }, 5000);
        }
      );
    });
  };
}
