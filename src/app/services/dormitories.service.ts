import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { from, Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { api } from 'src/api';
import { HttpService } from './http.service';
import { UserService } from './user.service';

const api_url = api.url;

@Injectable({
  providedIn: 'root',
})
export class DormitoriesService {
  constructor(
    private httpClient: HttpClient,
    private storage: Storage,
    private router: Router,
    private userService: UserService,
    private httpService: HttpService
  ) {}

  getAllUserDormitoriesRequest = async () => {
    const token = await this.storage.get('user_token');
    console.log('Token: ', token);

    const url = `${api_url}/view-owner-dormitories`;

    return this.httpClient.get(url, {
      headers: { Authorization: 'Bearer ' + token },
    });
  };

  getAllDormitoriesRequest = (filter1, filter2) => {
    const url = `${api_url}/get-all-dormitories?filter1=${filter1}&filter2=${filter2}`;

    return this.httpClient.get(url);
  };

  createDormDocumentRequest = async (
    imageFile,
    { documentType },
    { id },
    ext
  ) => {
    console.log(imageFile);
    console.log(documentType);
    console.log(id);
    const token = await this.userService.loadStoredToken();

    const formData = new FormData();
    formData.append('dormDocument', imageFile, `image.${ext}`);
    formData.append('documentType', documentType);
    formData.append('dormId', id);

    const url = `${api_url}/add-dormitory-documents`;

    return this.httpClient.post(url, formData, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  };

  createDormitoryRequest = async ({
    name,
    address,
    contactNumber,
    allowedGender,
  }) => {
    const token = await this.userService.loadStoredToken();
    console.log('Token', token);

    const url = `${api_url}/create-new-dormitory`;

    const body = {
      name,
      address,
      contactNumber,
      allowedGender,
    };

    return this.httpClient.post(url, body, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
  };

  getDormitoryDetails = (id) => {
    console.log('Dormitory Id: ' + id);
    const url = `${api_url}/view-dormitory-detail/${id}`;

    return this.httpClient.get(url);
  };

  dormitorySwitchRequest = (isAccepting, dormId) => {
    const url = `${api_url}/dormitory-switch`;

    const body = {
      dormId,
      isAccepting,
    };

    return this.httpService.put(url, body, true);
  };

  getAllDormitoriesAdminRequest = (filter) => {
    const url = `${api_url}/get-all-dormitories/admin/dormitory-${filter}`;

    return this.httpService.get(url, true);
  };

  getDormitoryDetailsAdminRequest = (dormitoryId) => {
    const url = `${api_url}/get-dormitory-detail/admin/dormitory-${dormitoryId}`;

    return this.httpService.get(url, true);
  };
}
