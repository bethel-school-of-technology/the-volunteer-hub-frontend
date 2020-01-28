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

  //Call load functions on init
  ngOnInit() {
    this.loadOrganizations();
    this.loadUsers();
  }

  //Load organizations from service
  loadOrganizations() {
    this.organizationsApi.getOrganizations().subscribe(organizations => {
      this.organizations = organizations;
    });
  }

  //Load users from service
  loadUsers() {
    this.usersApi.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  //Call service to delete organization, then reload organizations displayed and display notification that organization has been deleted
  deleteOrganization(event: any) {
    this.organizationsApi.deleteOrganization(event).subscribe(deleted => {
      this.loadOrganizations();

      alert("This organization has been deleted." + " " + deleted.message);
    });
  }

  //Remove a user from the database, then reload users displayed and display notification that user has been deleted
  deleteUser(event: any) {
    this.usersApi.deleteUser(event).subscribe(deleted => {
      this.loadUsers();

      alert(
        "This organization representative has been deleted." +
          " " +
          deleted.message
      );
    });
  }
}
