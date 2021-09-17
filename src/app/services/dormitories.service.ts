import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { api } from 'src/api';
import { UserService } from './user.service';

const api_url = api.url;

@Injectable({
  providedIn: 'root',
})
export class DormitoriesService {
  constructor(
    private httpClient: HttpClient,
    private storage: Storage,
    private router: Router
  ) {}

  async getAllUserDormitoriesRequest() {
    const token = await this.storage.get('user_token');
    console.log("Token: ", token);

    const url = `${api_url}/view-owner-dormitories`;

    return this.httpClient.get(url, {
      headers: { Authorization: 'Bearer ' +  token },
    });
  }

 getAllDormitoriesRequest(){
    const url = `${api_url}/get-all-dormitories`;

    return this.httpClient.get(url);
  }
}
