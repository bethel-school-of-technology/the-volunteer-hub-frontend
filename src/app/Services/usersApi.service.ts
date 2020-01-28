import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../model/user";

@Injectable({
  providedIn: "root"
})
export class UsersApiService {
  private getUserUrl = "http://localhost:3001/getUsers";
  private deleteUserUrl = "http://localhost:3001/users/admin/deleteUser";

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
