import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user.model';

const AUTH_API = 'http://localhost:7777/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // this AuthService was created to keep track of 
      // 1) whether a user has logged in or not
      // 2) the user who has logged in and manipulate it in the session storage
  isLoggedIn: boolean = false;

  storeUser(user: User){
    sessionStorage.setItem("userData", JSON.stringify(user));
  }

  retrieveUser(): User{
    var data: any = sessionStorage.getItem("userData");
    return JSON.parse(data == null?'':data);
  }

  removeUser(){
    sessionStorage.removeItem("userData");
  }

  retrieveUserType(){
    var data: any = sessionStorage.getItem("userData");
    var user: User = JSON.parse(data == null?'':data);
    return user.userType;
  }

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username,
      password
    }, httpOptions);
  }

  register(first_name: string, last_name: string, username: string, email: string, password: string, address: string, contact: string): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      first_name,
      last_name,
      username,
      email,
      password,
      address,
      contact
    }, httpOptions);
  }

}
