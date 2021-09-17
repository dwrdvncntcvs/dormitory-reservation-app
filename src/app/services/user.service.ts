import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { api } from 'src/api';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

const api_url = api.url;
const USER_TOKEN_KEY = 'user_token';

declare const window: any;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userData = new BehaviorSubject(null);

  constructor(
    private httpClient: HttpClient,
    private platform: Platform,
    private storage: Storage,
    private router: Router,
    private modalController: ModalController
  ) {
    this.loadStoredToken(); //Sample
  }

  //Sample
  async loadStoredToken() {
    const token = await this.storage.get('user_token');
    console.log(token);
    return token;
  }

  signUpRequest(
    {
      name,
      username,
      email,
      plainPassword,
      plainConfirmPassword,
      contactNumber,
      address,
      gender,
    },
    role
  ) {
    const url = `${api_url}/sign-up`;

    const body = {
      name,
      username,
      email,
      plainPassword,
      plainConfirmPassword,
      contactNumber,
      address,
      gender,
      role,
    };

    return this.httpClient.post(url, body, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  //Sample
  signInRequest({ username, plainPassword }, role) {
    const url = `${api_url}/sign-in`;

    const body = {
      username,
      plainPassword,
      role,
    };
    console.log(body);

    return this.httpClient
      .post(url, body, {
        headers: { 'Content-Type': 'application/json' },
      })
      .subscribe((token) => {
        this.modalController.dismiss();
        const response_token = token['token'];
        console.log(response_token);
        this.storage.set(USER_TOKEN_KEY, response_token);
        if (role === 'owner') {
          this.router.navigateByUrl('owner-tabs');
        } else if (role === 'tenant') {
          this.router.navigateByUrl('tenant-tabs');
        }
      });
  }

  checkEmailRequest({ email }) {
    const url = `${api_url}/find-user/${email}`;

    const host = window.location.hostname;
    const port = window.location.port;

    const body = {
      hostAddress: `http://${host}:${port}/change-password`,
    };

    return this.httpClient.post(url, body, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  changePasswordRequest({ plainPassword, plainConfirmPassword }, id) {
    const url = `${api_url}/change-user-password`;

    const body = {
      id,
      plainPassword,
      plainConfirmPassword,
    };

    return this.httpClient.put(url, body, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  logOutRequest() {
    this.storage.remove(USER_TOKEN_KEY);
    this.userData.next(null);
    this.router.navigateByUrl('dormRes/home');
  }
}
