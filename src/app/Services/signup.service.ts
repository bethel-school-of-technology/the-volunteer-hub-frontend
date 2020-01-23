import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../model/user";

@Injectable({
  providedIn: "root"
})
export class SignupService {
  _url = "http://localhost:3001/users/signup";

  constructor(private _http: HttpClient) {}

  signup(user: User) {
    return this._http.post<any>(this._url, user);
  }
}
