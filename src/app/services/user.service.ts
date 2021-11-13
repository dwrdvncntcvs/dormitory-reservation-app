import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { api } from 'src/api';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { HttpService } from './http.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoadingService } from './loading.service';

const api_url = api.url;
const USER_TOKEN_KEY = 'user_token';
const helper = new JwtHelperService();

declare const window: any;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  isLoggedIn = new BehaviorSubject(false);
  errorMessage = new BehaviorSubject('');

  constructor(
    private httpClient: HttpClient,
    private platform: Platform,
    private storage: Storage,
    private router: Router,
    private modalController: ModalController,
    private httpService: HttpService,
    private loadingService: LoadingService
  ) {}

  //Sample
  async loadStoredToken() {
    const token = await this.storage.get('user_token');
    console.log('token', token);
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

    return this.httpService.post(url, body, false);
  }

  //Sample
  signInRequest = ({ username, plainPassword }, role) => {
    const url = `${api_url}/sign-in`;

    const body = {
      username,
      plainPassword,
      role,
    };
    console.log(body);

    return this.httpService.post(url, body, false).then((response) => {
      response.subscribe(
       async (token) => {

          this.modalController.dismiss();
          const response_token = token['token'];
          console.log(response_token);
          this.storage.set(USER_TOKEN_KEY, response_token);

          this.isLoggedIn.next(true);

          if (role === 'owner') {
            this.router.navigateByUrl('/owner-tabs/dormitory-list');
            this.loadingService.dismissLoading();
          } else if (role === 'tenant') {
            this.router.navigateByUrl('/tenant-tabs/home');
            this.loadingService.dismissLoading();
          } else if (role === 'admin') {
            this.router.navigateByUrl('/administrator/admin-home');
            this.loadingService.dismissLoading();
          }
        },
        (error) => {
          this.loadingService.dismissLoading();
          this.isLoggedIn.next(false);
          console.log(error);
          this.errorMessage.next(error['error'].msg);
        }
      );
    });
  };

  checkUserRole = async () => {
    const token = await this.loadStoredToken();
    const decoded_token = helper.decodeToken(token);
    const userRole = decoded_token.role;
    return userRole;
  };

  checkEmailRequest({ email }) {
    const url = `${api_url}/find-user/${email}`;

    const host = window.location.host;
    console.log(window.location.host)

    const body = {
      hostAddress: `http://${host}/change-password`,
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
    this.isLoggedIn.next(false);
    this.storage.remove(USER_TOKEN_KEY);
    this.router.navigate(['resolver']);
  }

  async userProfileRequest() {
    const token = await this.loadStoredToken();

    const url = `${api_url}/user-profile`;

    return this.httpService.get(url, true);
  }

  getAllUserRequest = (role, filter) => {
    const url = `${api_url}/get-all-users/${role}?filter=${filter}`;

    return this.httpService.get(url, true);
  };

  getUserDetailRequest = (userId) => {
    const url = `${api_url}/get-user-detail/user-${userId}`;

    return this.httpService.get(url, true);
  };

  verifyUserEmailrequest = (userId) => {
    const url = `${api_url}/verify-account/${userId}`;

    return this.httpService.get(url, true);
  };

  verifyUserAccountRequest = (userId) => {
    const url = `${api_url}/verify-user`;

    const body = {
      id: userId,
      isVerified: true,
    };

    return this.httpService.put(url, body, true);
  };

  addProfileImageRequest = async (userId, imageFile) => {
    const token = await this.loadStoredToken();
    const url = `${api_url}/add-profile-image`;

    const formData = new FormData();
    formData.append('profileImage', imageFile);

    return this.httpClient.post(url, formData, {
      headers: { Authorization: 'Bearer ' + token },
    });
  };

  deleteProfileImageRequest = (imageId) => {
    const url = `${api_url}/delete-profile-image/${imageId}`;

    return this.httpService.delete(url, true);
  };

  editProfileName = (name) => {
    console.log(`Edit profile ${name}`);
    const url = `${api_url}/edit-user-name`;

    const body = {
      name: name,
    };

    return this.httpService.put(url, body, true);
  };

  editProfileUsername = (username) => {
    const url = `${api_url}/edit-user-username`;

    const body = {
      username: username,
    };

    return this.httpService.put(url, body, true);
  };

  editProfileAddress = (address) => {
    const url = `${api_url}/edit-user-address`;

    const body = {
      address: address,
    };

    return this.httpService.put(url, body, true);
  };

  denyUserVerificationRequest = (userId) => {
    const url = `${api_url}/deny-user-verification/userId-${userId}`;

    return this.httpService.delete(url, true);
  };

  addUserDocumentRequest = async (
    image: any,
    ext: any,
    documentType: string,
    documentName: string
  ) => {
    console.log(image, ext, documentName, documentType);
    const token = await this.loadStoredToken();

    const url = `${api_url}/add-user-documents`;

    const formData = new FormData();
    formData.append('documentImage', image, `image.${ext}`);
    formData.append('documentName', documentName);
    formData.append('documentType', documentType);

    return this.httpClient.post(url, formData, {
      headers: { Authorization: 'Bearer ' + token },
    });
  };

  editProfileNameRequest = (name: string) => {
    const url = `${api_url}/edit-user-name`;
    const body = {
      name,
    };

    return this.httpService.put(url, body, true);
  };

  editProfileUsernameRequest = (username: string) => {
    const url = `${api_url}/edit-user-username`;
    const body = {
      username,
    };

    return this.httpService.put(url, body, true);
  };

  editProfileAddressRequest = (address: string) => {
    const url = `${api_url}/edit-user-address`;
    const body = {
      address,
    }

    return this.httpService.put(url, body, true);
  };
}
