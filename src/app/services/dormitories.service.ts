import { HttpClient } from '@angular/common/http';
import { Injectable, ɵɵsetComponentScope } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
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
    { roomName, roomCapacity, activeTenant, roomCost, electricBill, waterBill },
    dormitoryId: number
  ) => {
    const url = `${api_url}/create-new-room`;

    const body = {
      roomName,
      activeTenant,
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
    console.log('LOCATION ID: ', locationId);
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

  deleteDormitoryProfileImage = (
    dormitoryId: number,
    dormProfileImageId: number
  ) => {
    const url = `${api_url}/delete-dormitory-profile-image/dorm-${dormitoryId}/image-${dormProfileImageId}`;

    return this.httpService.delete(url, true);
  };

  deleteDormitoryRoomrequest = (dormitoryId: number, roomId: number) => {
    const url = `${api_url}/delete-room/dormitory-${dormitoryId}/room-${roomId}`;

    return this.httpService.delete(url, true);
  };

  updateDormitoryRoomRequest = (
    roomId: any,
    dormitoryId: any,
    roomCost: string,
    electricBill: string,
    waterBill: string
  ) => {
    const url = `${api_url}/update-room-payment`;

    const body = {
      roomId,
      dormId: dormitoryId,
      roomCost,
      electricBill,
      waterBill,
    };

    return this.httpService.put(url, body, true);
  };

  deleteDormitoryAmenityRequest = (dormitoryId: number, amenityId: number) => {
    const url = `${api_url}/delete-amenity/dorm-${dormitoryId}/amenity-${amenityId}`;

    return this.httpService.delete(url, true);
  };

  deleteDormitoryImageRequest = (dormitoryId: number, imageId: number) => {
    const url = `${api_url}/delete-dormitory-image/dorm-${dormitoryId}/image-${imageId}`;
    console.log(url);
    return this.httpService.delete(url, true);
  };

  removeDormitoryLocationRequest = (
    dormitoryId: number,
    locationId: number
  ) => {
    const url = `${api_url}/delete-dormitory-location/dormitory-${dormitoryId}/location-${locationId}`;

    return this.httpService.delete(url, true);
  };

  deleteDormitoryRequest = (dormitoryId: number) => {
    const url = `${api_url}/delete-dormitory/dormitory-${dormitoryId}`;
    console.log('URL: ', url);

    return this.httpService.delete(url, true);
  };

  deleteDormitoryLandmarkRequest = (
    dormitoryId: number,
    landmarkId: number
  ) => {
    const url = `${api_url}/delete-landmark/dormitory-${dormitoryId}/landmark-${landmarkId}`;
    console.log(url);

    return this.httpService.delete(url, true);
  };

  addDormitoryPaymentRequest = async (
    dormId: any,
    userId: any,
    paymentImage: any,
    { sender, recipientNumber, amount, referenceNumber },
    ext: string
  ) => {
    const token = await this.userService.loadStoredToken();

    const url = `${api_url}/add-new-payment`;

    const formData = new FormData();
    formData.append('paymentImage', paymentImage, `image/${ext}`);
    formData.append('dormitoryId', dormId);
    formData.append('userId', userId);
    formData.append('sender', sender);
    formData.append('recipientNumber', recipientNumber);
    formData.append('amount', amount);
    formData.append('referenceNumber', referenceNumber);

    return this.httpClient.post(url, formData, {
      headers: { Authorization: 'Bearer ' + token },
    });
  };

  addDormitoryQuestionRequest = (question: string, dormitoryId: any) => {
    console.log('Question: ', question);
    console.log('Dormitory ID: ', dormitoryId);

    const url = `${api_url}/create-question`;

    const body = {
      dormitoryId,
      question,
    };

    return this.httpService.post(url, body, true);
  };

  deleteDormitoryQuestionRequest = (questionId: any, dormitoryId: any) => {
    console.log('Dormitory ID: ', dormitoryId);
    console.log('Question ID: ', questionId);

    const url = `${api_url}/remove-question/question-${questionId}/dormitory-${dormitoryId}`;

    return this.httpService.delete(url, true);
  };

  addCommentRequest = (comment: string, dormitoryId: any, questionId: any) => {
    const url = `${api_url}/add-comment`;

    const body = {
      comment,
      dormitoryId,
      questionId,
    };

    console.log('BODY: ', body);
    return this.httpService.post(url, body, true);
  };

  removeCommentRequest = (dormitorId: any, questionId: any, commentId: any) => {
    const url = `${api_url}/remove-comment/dormitory-${dormitorId}/question-${questionId}/comment-${commentId}`;

    return this.httpService.delete(url, true);
  };

  createRoomReservationRequest = (
    dormitoryId: number,
    roomId: number,
    slot: number
  ) => {
    const url = `${api_url}/create-new-reservation`;

    const body = {
      dormId: dormitoryId,
      roomId,
      slot,
    };

    return this.httpService.post(url, body, true);
  };

  removerRoomReservationRequest = (
    dormitoryId: number,
    roomId: number,
    reservationId: number
  ) => {
    const url = `${api_url}/cancel-reservation/dormitory-${dormitoryId}/room-${roomId}/reservation-${reservationId}`;

    return this.httpService.delete(url, true);
  };

  getReservationDetailRequest = (
    roomId: number,
    reservationId: number,
    dormitoryId: number
  ) => {
    const url = `${api_url}/view-reservation-detail/dormitory-${dormitoryId}/room-${roomId}/reservation-${reservationId}`;

    return this.httpService.get(url, true);
  };

  getRoomDetailRequest = (dormitoryId: number, roomId: number) => {
    const url = `${api_url}/get-room-detail/dormitory-${dormitoryId}/room-${roomId}`;

    return this.httpService.get(url, true);
  };

  acceptTenantReservationRequest = (
    dormitoryId: number,
    roomId: number,
    reservationId: number
  ) => {
    const url = `${api_url}/accept-new-reservation`;

    const body = {
      dormId: dormitoryId,
      roomId,
      reservationId,
    };

    console.log('URL: ', url);
    console.log('Body: ', body);

    return this.httpService.put(url, body, true);
  };

  rejectTenantReservationRequest = (
    dormitoryId: number,
    roomId: number,
    reservationId: number
  ) => {
    const url = `${api_url}/reject-user-reservation/dormitory-${dormitoryId}/room-${roomId}/reservation-${reservationId}`;

    return this.httpService.delete(url, true);
  };

  filterReservationRequest = (
    dormitoryId: number,
    isActive: boolean,
    isPending: boolean,
    isAccepted: boolean
  ) => {
    const url = `${api_url}/filter-reservation/dormitory-${dormitoryId}?isPending=${isPending}&isAccepted=${isAccepted}&isActive=${isActive}`;

    return this.httpService.get(url, true);
  };

  addUserAsActiveTenantRequest = (
    dormitoryId: number,
    roomId: number,
    reservationId: number
  ) => {
    const url = `${api_url}/add-tenant-reservation`;

    const body = {
      dormId: dormitoryId,
      roomId,
      reservationId,
    };

    return this.httpService.put(url, body, true);
  };

  removeUserAsActiveTenantRequest = (
    dormitoryId: number,
    roomId: number,
    reservationId: number
  ) => {
    const url = `${api_url}/remove-tenant-user/dormitory-${dormitoryId}/room-${roomId}/reservation-${reservationId}`;

    return this.httpService.delete(url, true);
  };
}
