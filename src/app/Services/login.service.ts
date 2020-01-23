import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../model/user";

@Injectable({
  providedIn: "root"
})
export class LoginService {
  _url = "http://localhost:3001/users/login";

  constructor(private http: HttpClient) {}
  login(user: User) {
    return this.http.post<any>(this._url, user);
  }
}
