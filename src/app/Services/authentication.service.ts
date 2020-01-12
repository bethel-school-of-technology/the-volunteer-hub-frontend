import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";

import { User } from "../model/user";

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  isAuthenticated: boolean = this.checkLogin();
  adminCheck: boolean;

  checkAdmin() {
    return this.adminCheck;
  }

  checkLogin() {
    function getCookie(token) {
      var name = token + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }
    if (getCookie("token")) {
      return true;
    } else {
      return false;
    }
  }

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
            this.isAuthenticated = true;

            if (user.user.admin) {
              this.adminCheck = true;
              return user;
            } else {
              this.adminCheck = false;
              return user;
            }
          }
        })
      );
  }


  logout() {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    this.isAuthenticated = false;
    console.log(document.cookie);
    // remove user data from local storage for log out
    // localStorage.removeItem('currentUser');
    // this.currentUserSubject.next(null);
  }
}
