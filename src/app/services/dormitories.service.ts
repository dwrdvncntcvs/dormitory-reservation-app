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
    console.log('Ext', ext);
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

  verifyDormitoryRequest = (dormitoryId, userId) => {
    const url = `${api_url}/verify-dormitory`;

    const body = {
      dormId: dormitoryId,
      userId: userId,
      isVerified: true,
    };

    return this.httpService.put(url, body, true);
  };

  denyDormitoryVerificationRequest = (dormitoryId, userId) => {
    const url = `${api_url}/deny-dormitory-verification/userId-${userId}/dormitoryId-${dormitoryId}`;

    return this.httpService.delete(url, true);
  };

  verifyDormitoryPaymentRequest = (userId, dormitoryId, paymentId) => {
    const url = `${api_url}/verifiy-dormitory-payment`;

    const body = {
      userId,
      dormitoryId,
      paymentId,
    };

    return this.httpService.put(url, body, true);
  };

  denyDormitoryPaymentRequest = (userId, dormitoryId, paymentId) => {
    const url = `${api_url}/deny-dormitory-payment/dormtiory-${dormitoryId}/payment-${paymentId}/user-${userId}`;

    return this.httpService.delete(url, true);
  };

  searchDormitoryRequest = (search: string) => {
    console.log(search);

    const url = `${api_url}/search-dormitory?search=${search}`;

    return this.httpService.get(url);
  };

  createRoomRequest = (
    { roomName, roomCapacity, roomCost, electricBill, waterBill },
    dormitoryId: number
  ) => {
    const url = `${api_url}/create-new-room`;

    const body = {
      roomName,
      roomCapacity,
      roomCost,
      electricBill,
      waterBill,
      dormId: dormitoryId,
    };

    return this.httpService.post(url, body, true);
  };

  createAmenityRequest = ({ amenity }, dormId: number) => {
    const url = `${api_url}/add-new-amenity`;

    const body = {
      dormId,
      amenity,
    };

    return this.httpService.post(url, body, true);
  };

  createDormitoryLocationRequest = (latitude, longitude, dormId) => {
    const url = `${api_url}/add-dormitory-location`;

    const body = {
      dormId,
      latitude,
      longitude,
    };

    return this.httpService.post(url, body, true);
  };

  getDormitoryLocationRequest = (dormitoryId: number, locationId: number) => {
    const url = `${api_url}/get-dormitory-location/dormitory-${dormitoryId}/location-${locationId}`;

    return this.httpService.get(url, true);
  };

  addDormitoryImageRequest = async (
    imageFile,
    { name },
    { id },
    ext: string
  ) => {
    const token = await this.userService.loadStoredToken();

    const url = `${api_url}/add-dormitory-image`;
    const formData = new FormData();
    formData.append('dormImage', imageFile, `image.${ext}`);
    formData.append('name', name);
    formData.append('dormId', id);

    return this.httpClient.post(url, formData, {
      headers: { Authorization: 'Bearer ' + token },
    });
  };

  addDormitoryBannerRequest = async (imageFile, { id }, ext: string) => {
    const token = await this.userService.loadStoredToken();

    const url = `${api_url}/add-dormitory-profile-image`;
    const formData = new FormData();
    formData.append('dormProfileImage', imageFile, `image.${ext}`);
    formData.append('id', id);

    return this.httpClient.post(url, formData, {
      headers: { Authorization: 'Bearer ' + token },
    });
  };

  addLandmarkRequest = (
    landmark: string,
    dormitoryId: number,
    longitude: number,
    latitude: number
  ) => {
    const url = `${api_url}/add-landmark`;

    const body = {
      landmark,
      dormId: dormitoryId,
      longitude,
      latitude,
    };

    return this.httpService.post(url, body, true);
  };
}
