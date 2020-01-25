import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../model/user";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: "root"
})
export class UsersApiService {
  private getUserUrl = environment.VOLUNTEER_HUB_API + "/getUsers";
  private deleteUserUrl = environment.VOLUNTEER_HUB_API + "/users/admin/deleteUser";

  constructor(private http: HttpClient) {
  }

  //Returns all users
  getUsers() {
    return this.http.get<User[]>(this.getUserUrl);
  }

  //Deletes a user
  deleteUser(id: string) {
    return this.http.delete<any>(`${this.deleteUserUrl}/${id}`, {
      withCredentials: true
    });
  }
}
