import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../model/user";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: "root"
})
export class LoginService {
  _url = environment.VOLUNTEER_HUB_API + "/users/login";

  constructor(private http: HttpClient) {}
  login(user: User) {
    return this.http.post<any>(this._url, user);
  }
}
