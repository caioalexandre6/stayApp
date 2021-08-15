import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public googleapisLogin: string;
  public googleapisSignUp: string;
  public googleapisCheckUser: string;

  constructor(private httpClient: HttpClient) {
    this.googleapisLogin =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDKp05V515h6CX8brfoYgClbK-c06nZwC4';
    this.googleapisSignUp =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDKp05V515h6CX8brfoYgClbK-c06nZwC4';
    this.googleapisCheckUser =
      'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDKp05V515h6CX8brfoYgClbK-c06nZwC4';
  }

  loginService(email: any, password: any) {
    var obj = {
      email,
      password,
    };
    const headers = new HttpHeaders();
    return this.httpClient.post(this.googleapisLogin, obj, { headers });
  }

  signUp(email: any, password: any) {
    var obj = {
      email,
      password,
    };
    const headers = new HttpHeaders();
    return this.httpClient.post(this.googleapisSignUp, obj, { headers });
  }

  verifyUser() {
    const headers = new HttpHeaders();
    return this.httpClient.post(this.googleapisCheckUser, { headers });
  }
}
