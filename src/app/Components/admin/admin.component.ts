import { Component, OnInit, Input } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Post } from "../../model/post";
import { Organizations } from "../../model/organizations";
import { User } from "../../model/user";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"]
})
export class AdminComponent implements OnInit {
  private orgsUrl = "http://localhost:3001/getOrgs";
  private usersUrl = "http://localhost:3001/getUsers";
  private deleteOrgUrl = "http://localhost:3001/users/admin/deleteOrg";
  posts: Post[];
  organizations: Organizations[];
  org: Organizations;
  users: User[];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // this.http.get<Post[]>(this.dataPath).subscribe(posts => {
    //   this.posts = posts;
    // });
    this.http.get<User[]>(this.usersUrl).subscribe(users => {
      this.users = users;
    });
    this.loadOrganizations();
  }

  loadOrganizations() {
    this.http.get<Organizations[]>(this.orgsUrl).subscribe(organizations => {
      this.organizations = organizations;
    });
  }

  deleteOganizationUrl(event: any) {
    console.log(event);
    return this.http.delete<any>(`${this.deleteOrgUrl}/${event}`, {
      withCredentials: true
    });
  }

  deleteOrganization(event: any) {
    this.deleteOganizationUrl(event).subscribe(deleted => {
      this.loadOrganizations();

      alert("This organization has been deleted." + "" + deleted.message);
      // location.assign('http://localhost:4200/profile');
    });
  }
}
