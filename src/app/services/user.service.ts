import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {apiUrl} from '../../environments/environment';
import {Observable, Subject} from 'rxjs';
import {User} from "../models/User";
import { JwtResponse } from '../shared/security/jwt-response';
import { TokenStorageService } from '../shared/security/token-storage.service';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable({
    providedIn: 'root'
})
export class UserService {
    public currentUser: Observable<JwtResponse>;
    public service: TokenStorageService;
    public nameTerms = new Subject<string>();
    public name$ = this.nameTerms.asObservable();
    public TOKEN_KEY='tokenkey';
    public AUTHORITIES_KEY='authkey';
    private roles: Array<string> = [];

    constructor(private http: HttpClient) {
    }

    logout() {
        window.localStorage.clear();
    }
    reloadPage() {
        window.location.reload();
      }
    update(user: User): Observable<User> {
        const id=user.id;
        const url = `${apiUrl}/User/${id}`;
        return this.http.put<User>(url, user);    
    }
    updateSecurity(user: any): Observable<User> {
        const id=user.id;
        const url = `${apiUrl}/User/Security/${id}`;
        return this.http.put<User>(url, user);    
    }
    get(username: string): Observable<User> {
        const url = `${apiUrl}/User/${username}`;
        return this.http.get<User>(url);
    }
    getUserId(id: string): Observable<User> {
        const url = `${apiUrl}/User/${id}`;
        return this.http.get<User>(url);
      }

    getRole() {
        return localStorage.getItem('ROLE');
      }
}
