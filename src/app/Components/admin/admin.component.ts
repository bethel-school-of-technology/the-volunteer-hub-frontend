import { Component, OnInit, Input } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Post } from "../../model/post";
import { Organizations } from "../../model/organizations";
import { User } from "../../model/user";
import { OrganizationsApiService } from "../../Services/organizationsApi.service";
import { UsersApiService } from "../../Services/usersApi.service";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"]
})
export class AdminComponent implements OnInit {
  posts: Post[];
  organizations: Organizations[];
  org: Organizations;
  users: User[];
  user: User;

  constructor(
    private http: HttpClient,
    private usersApi: UsersApiService,
    private organizationsApi: OrganizationsApiService
  ) {}

  ngOnInit() {
    // this.http.get<Post[]>(this.dataPath).subscribe(posts => {
    //   this.posts = posts;
    // });
    this.loadOrganizations();
    this.loadUsers();
  }

  loadOrganizations() {
    this.organizationsApi.getOrganizations().subscribe(organizations => {
      this.organizations = organizations;
    });
  }

  loadUsers() {
    this.usersApi.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  deleteOrganization(event: any) {
    this.organizationsApi.deleteOrganization(event).subscribe(deleted => {
      this.loadOrganizations();

      alert("This organization has been deleted." + " " + deleted.message);
      // location.assign('http://localhost:4200/profile');
    });
  }

  deleteUser(event: any) {
    this.usersApi.deleteUser(event).subscribe(deleted => {
      this.loadUsers();

      alert(
        "This organization representative has been deleted." +
          " " +
          deleted.message
      );
      // location.assign('http://localhost:4200/profile');
    });
  }
}
