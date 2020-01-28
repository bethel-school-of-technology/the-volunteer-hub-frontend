import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
// import { User } from "../model/user";
import { Organizations } from "../model/organizations";

@Injectable({
  providedIn: "root"
})
export class OrganizationsApiService {
  private getOrgsUrl = "http://localhost:3001/getOrgs";
  private deleteOrgUrl = "http://localhost:3001/users/admin/deleteOrg";

  constructor(private http: HttpClient) {
    //
  }

  //Returns all organizations
  getOrganizations() {
    return this.http.get<Organizations[]>(this.getOrgsUrl);
  }

  //Deletes organization by id
  deleteOrganization(id: string) {
    return this.http.delete<any>(`${this.deleteOrgUrl}/${id}`, {
      withCredentials: true
    });
  }
}
