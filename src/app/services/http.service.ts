import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root',
})
export class HttpService {

  constructor(
    private httpClient: HttpClient,
    private storage: Storage,
  ) {}

  createHeader = async (useToken) => {
    const headers = {
      'Content-Type': 'application/json',
    };
    if (useToken) {
      const token = await this.storage.get('user_token');
      headers['Authorization'] = 'Bearer ' + token;
    }
    return headers;
  };

  get = async (url, useToken = true) => {
    const headers = this.createHeader(useToken);
    return this.httpClient.get(url, { headers: await headers });
  };

  post = async (url, body, useToken = true) => {
    const headers = this.createHeader(useToken);
    return this.httpClient.post(url, body, { headers: await headers });
  };

  put = async (url, body, useToken = true) => {
    const headers = this.createHeader(useToken);
    return this.httpClient.post(url, body, { headers: await headers });
  };

  delete = async (url, useToken) => {
    const headers = this.createHeader(useToken);
    return this.httpClient.delete(url, { headers: await headers});
  };
}
