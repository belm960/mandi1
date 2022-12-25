import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
 
import { JwtResponse } from './jwt-response';
import { AuthLoginInfo } from './login-info';
import { SignUpInfo } from './signup-info';
import { of } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
import {apiUrl} from 'src/environments/environment';
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLogin = false;
  roleAs: string
  private loginUrl = apiUrl+'/api/auth/signin';
  private signupUrl = apiUrl+'/api/auth/signup';
 
  constructor(private http: HttpClient) {
  }
 
  attemptAuth(credentials: AuthLoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions);
  }
 
  signUp(info): Observable<string> {
    return this.http.post<string>(this.signupUrl, info, httpOptions);
  }
  getRole() {
    return localStorage.getItem('ROLE');
  }
  isLoggedIn() {
    const loggedIn = localStorage.getItem('STATE');
    if (loggedIn === 'true') {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
    return this.isLogin;
  }
  getUserFullName() {
    return localStorage.getItem('FULLNAME');
  }
  getUserImg() {
    return localStorage.getItem('USERIMG');
  }
  logout() {
    this.isLogin = false;
    this.roleAs = '';
    localStorage.setItem('STATE', 'false');
    localStorage.setItem('ROLE', '');
    localStorage.setItem('FULLNAME', '');
    localStorage.setItem('USERIMG', '');
    return of({ success: this.isLogin, role: '' });
  }
}