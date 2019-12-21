import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";

import { User } from "../model/user";

@Injectable({ providedIn: "root" })
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    // this.currentUserSubject = new BehaviorSubject<User>(
    //   JSON.parse(localStorage.getItem('currentUser'))
    // );
    // this.currentUser = this.currentUserSubject.asObservable();
  }

  // public get currentUserValue(): User {
  //   return this.currentUserSubject.value;
  // }

  login(username: string, password: string) {
    return this.http
      .post<any>(`http://localhost:3001/users/login`, { username, password })
      .pipe(
        map(user => {
          if (user && user.token) {
            // store user details in local storage to keep user logged in
            return user;
            // this.currentUserSubject.next(user);
          }
        })
      );
  }

  logout() {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    console.log(document.cookie);
    // remove user data from local storage for log out
    // localStorage.removeItem('currentUser');
    // this.currentUserSubject.next(null);
  }

}
