import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
// import { User } from "../model/user";
import { Organizations } from "../model/organizations";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: "root"
})
export class OrganizationsApiService {
  private getOrgsUrl = environment.VOLUNTEER_HUB_API + "/getOrgs";
  private deleteOrgUrl = environment.VOLUNTEER_HUB_API + "/users/admin/deleteOrg";

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
