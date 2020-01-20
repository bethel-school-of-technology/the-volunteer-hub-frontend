import { Component, OnInit } from "@angular/core";
import { Organizations } from "../../model/organizations";
import { User } from "../../model/user";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
import { FormsModule } from "@angular/forms";
import { AuthenticationService } from "../../Services/authentication.service";

@Component({
  selector: "app-edit-organization",
  templateUrl: "./edit-organization.component.html",
  styleUrls: ["./edit-organization.component.css"]
})
export class EditOrganizationComponent implements OnInit {
  url: string;
  editOrgForm: FormGroup;
  updateOrg = "http://localhost:3001/users/updateOrg";
  orgUrl = "http://localhost:3001/getOrgById";
  deleteOrg = "http://localhost:3001/users/deleteOrg";
  user: User;
  currentUser;
  org: Organizations;
  // tslint:disable-next-line: variable-name,
  id: number;
  valid: boolean;

  constructor(
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    const org = this.route.snapshot.paramMap.get("id");

    this.http.get<Organizations>(`${this.orgUrl}/${org}`).subscribe(org => {
      this.org = org;
      console.log(org);
      this.http.get<any>('http://localhost:3001/users/getUser', { withCredentials: true }).subscribe(user => {
        this.currentUser = user;
        this.canEdit(org, user);
      });
    });

    this.editOrgForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      city: new FormControl("", [Validators.required]),
      state: new FormControl("", [
        Validators.required,
        Validators.minLength(3)
      ]),
      email: new FormControl("", [Validators.required, Validators.email]),
      phoneNumber: new FormControl("", [
        Validators.required,
        Validators.pattern("^[0-9]+$"),
        Validators.minLength(10),
        Validators.maxLength(10)
      ]),
      description: new FormControl("", [Validators.required])
    });
  }

  editOrgUrl() {
    const result: Organizations = Object.assign({}, this.editOrgForm.value);
    return this.http.patch<any>(`${this.updateOrg}/${this.org._id}`, result, {
      withCredentials: true
    });
  }

  canEdit(org, user) {
    let username = user.user.username;
    let values = {
      "_id": org._id,
      "user": username
    }
    this.http.post<any>('http://localhost:3001/users/compareUser', values, { withCredentials: true }).subscribe(
        result => {
          if (result.message == "All good!") {
            console.log(result);
            this.valid = true;
          } else {
            this.valid = false;
          }
        }
      )

  }

  editOrg() {
    this.editOrgUrl().subscribe(
      updatedOrg => {
        this.org = updatedOrg;
        console.log(
          "Your organization has been successfully edited.",
          updatedOrg
        );
        alert("This organization has been updated");
        this.router.navigate(["/profile"]);
      },
      err => console.log("Error!", err)
    );
  }

  async deleteOganizationUrl() {
    return this.http
      .delete<void>(`${this.deleteOrg}/${this.org._id}`, {
        withCredentials: true
      })
      .subscribe();
  }

  deleteOrganization() {
    this.deleteOganizationUrl().then(deleted => {
      alert("This organization has been deleted.");
      this.router.navigate(["/profile"]);
    });
  }
}
