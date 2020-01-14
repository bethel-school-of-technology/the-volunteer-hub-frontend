import { Component, OnInit, Input } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Post } from "../../model/post";
import { Organizations } from "../../model/organizations";
import { User } from '../../model/user';

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"]
})
export class AdminComponent implements OnInit {

  private orgsUrl = 'http://localhost:3001/getOrgs';
  private usersUrl = 'http://localhost:3001/getUsers';
  private deleteOrgUrl = 'http://localhost:3001/admin/deleteOrg';
  posts: Post[];
  organizations: Organizations[];
  org: Organizations;
  users: User[];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // this.http.get<Post[]>(this.dataPath).subscribe(posts => {
    //   this.posts = posts;
    // });
    this.http.get<Organizations[]>(this.orgsUrl).subscribe(organizations => {
      this.organizations = organizations;
    });
    this.http.get<User[]>(this.usersUrl).subscribe(users => {
      this.users = users;
    });
  }

  async deleteOganizationUrl() {
    return this.http.delete<void>(`${this.deleteOrgUrl}/${this.org._id}`, { withCredentials: true }).subscribe();
  }

  deleteOrganization() {
    this.deleteOganizationUrl().then(
      deleted => {
        alert('This organization has been deleted.' + '' + deleted);
        location.assign('http://localhost:4200/profile');
      }
    );
  }
}
