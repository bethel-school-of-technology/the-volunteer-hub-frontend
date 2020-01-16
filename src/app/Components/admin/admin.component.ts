import { Component, OnInit, Input } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Post } from "../../model/post";
import { Organizations } from "../../model/organizations";
import { User } from "../../model/user";
import { OrganizationsApiService } from "../../Services/organizationsApi.service";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"]
})
export class AdminComponent implements OnInit {
  private usersUrl = "http://localhost:3001/getUsers";
  posts: Post[];
  organizations: Organizations[];
  org: Organizations;
  users: User[];

  constructor(
    private http: HttpClient,
    private organizationsApi: OrganizationsApiService
  ) {}

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
    this.organizationsApi.getOrganizations().subscribe(organizations => {
      this.organizations = organizations;
    });
  }

  deleteOrganization(event: any) {
    this.organizationsApi.deleteOrganization(event).subscribe(deleted => {
      this.loadOrganizations();

      alert("This organization has been deleted." + "" + deleted.message);
      // location.assign('http://localhost:4200/profile');
    });
  }
}
