import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { api } from 'src/api';

const api_url = api.url;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: Observable<any>;
  userData = new BehaviorSubject(null);

  constructor(private httpClient: HttpClient, platform: Platform) {}

}
