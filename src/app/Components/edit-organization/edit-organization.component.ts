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
import { environment } from '../../../environments/environment';

@Component({
  selector: "app-edit-organization",
  templateUrl: "./edit-organization.component.html",
  styleUrls: ["./edit-organization.component.css"]
})
export class EditOrganizationComponent implements OnInit {
  url: string;
  editOrgForm: FormGroup;
  updateOrg = environment.VOLUNTEER_HUB_API + "/users/updateOrg";
  orgUrl = environment.VOLUNTEER_HUB_API + "/getOrgById";
  deleteOrg = environment.VOLUNTEER_HUB_API + "/users/deleteOrg";
  user: User;
  currentUser;
  org: Organizations;
  id: number;
  valid: boolean;

  constructor(
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    //Create a variable that stores the id that is in the url
    const org = this.route.snapshot.paramMap.get("id");

    //Get that specific organization
    this.http.get<Organizations>(`${this.orgUrl}/${org}`).subscribe(org => {
      this.org = org;
      console.log(org);
      //This function checks to see who is currently logged in
      this.http
        .get<any>(environment.VOLUNTEER_HUB_API + "/users/getUser", {
          withCredentials: true
        })
        .subscribe(user => {
          this.currentUser = user;
          this.canEdit(org, user);
        });
    });

    //Create a new form using Formgroup and Formcontrol
    //Validators are a built in FormControl function that have certain variables built in
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

  //This calls a backend service which edits the values of the organization
  editOrgUrl() {
    const result: Organizations = Object.assign({}, this.editOrgForm.value);
    return this.http.patch<any>(`${this.updateOrg}/${this.org._id}`, result, {
      withCredentials: true
    });
  }

  //Here when ngOnInit is called, this checks to see if the person logged in 'owns' the organization (created it), which if returned true would allow the user to edit it
  //Whereas if it is false, then it will not allow you to edit and will not display that section of HTML
  canEdit(org, user) {
    //Create a JSON object that has the id of the organization and the username of the person logged in
    //Currently, organizations have a username value, which stores the name of the user that created it
    let username = user.user.username;
    let values = {
      _id: org._id,
      user: username
    };
    //This calls a request which passes the the JSON object and current cookies that are stored in the browser
    this.http
      .post<any>(environment.VOLUNTEER_HUB_API + "/users/compareUser", values, {
        withCredentials: true
      })
      .subscribe(result => {
        //If the user logged in created the organization, then it displays the HTML and allows you to edit it
        if (result.message == "All good!") {
          console.log(result);
          this.valid = true;
          //If the user logged in doesn't own the organization, or isn't logged in, then you will not be able to edit the HTML
        } else {
          this.valid = false;
        }
      });
  }

  //Function to edit the organization
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

  //This allows the user to delete their organization, after they are rerouted to their profile page
  deleteOrganization() {
    this.deleteOganizationUrl().then(deleted => {
      alert("This organization has been deleted.");
      this.router.navigate(["/profile"]);
    });
  }
}
