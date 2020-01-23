import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";

import { User } from "../model/user";
import { Router } from "@angular/router";

//This function takes a cookie name then sorts through all cookies in browser and returns the one you want with string manipulation
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
  router: Router;

  //Checks if logged in user has admin token
  checkAdmin() {
    return getCookie("admin") == "true";
  }

  //check if user owns organization
  compareUser(org, user) {
    let values = {
      _id: org._id,
      user: user
    };
    //Checks if token exists, which would mean they are logged in
    //Then it calls a backend function which compares if user owns the organization in question
    if (getCookie("token")) {
      this.http
        .post<any>("http://localhost:3001/users/compareUser", values, {
          withCredentials: true
        })
        .subscribe(result => {
          if (result.message == "All good!") {
            console.log(result);
          }
        });
    } else {
      return false;
    }
  }

  //This checks if user is logged in, used in navbar
  checkLogin() {
    if (getCookie("token")) {
      return true;
    } else {
      return false;
    }
  }

  constructor(private http: HttpClient) {}

  //Login function
  login(username: string, password: string) {
    return this.http
      .post<any>(`http://localhost:3001/users/login`, { username, password })
      .pipe(
        map(data => {
          if (data && data.token) {
            this.isAuthenticated = true;

            this.adminCheck = data.user.admin;

            //Create cookies in browser using tokens created in backend
            document.cookie = `token=${data.token}`;
            document.cookie = `admin=${data.user.admin}`;

            console.log(document.cookie);

            return data;
          }
        })
      );
  }

  //Logout function, removes tokens from browser by expiring them
  logout() {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "admin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    //Sets values that navbar uses to false
    this.isAuthenticated = false;
    this.adminCheck = false;
  }
}
