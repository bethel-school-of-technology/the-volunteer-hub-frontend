import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../model/user";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: "root"
})
export class SignupService {
  _url = environment.VOLUNTEER_HUB_API + "/users/signup";

  constructor(private _http: HttpClient) {}

  signup(user: User) {
    return this._http.post<any>(this._url, user);
  }
}
