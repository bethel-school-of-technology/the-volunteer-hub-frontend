import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";

import { User } from "../model/user";

function getCookie(param: string) {
  var name = param + "=";
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

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  isAuthenticated: boolean = this.checkLogin();
  adminCheck: boolean;

  checkAdmin() {
    return getCookie("admin") == "true";
  }

  checkLogin() {
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
        map(data => {
          if (data && data.token) {
            this.isAuthenticated = true;

            this.adminCheck = data.user.admin;

            // create cookies
            document.cookie = `token=${data.token}`;
            document.cookie = `admin=${data.user.admin}`;

            // document.cookie = `token=${data.token};admin=${data.user.admin}`;
            // document.cookie =
            //   "cookie=" +
            //   JSON.stringify({
            //     token: data.token,
            //     admin: data.user.admin
            //   });

            console.log(document.cookie);

            // console.log("Logged in:");
            // this.checkAdmin();

            return data;
          }
        })
      );
  }

  logout() {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "admin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    this.isAuthenticated = false;
    console.log(document.cookie);

    // remove user data from local storage for log out
    // localStorage.removeItem('currentUser');
    // this.currentUserSubject.next(null);
  }
}
