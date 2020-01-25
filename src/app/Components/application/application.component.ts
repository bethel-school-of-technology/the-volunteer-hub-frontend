import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Organizations } from "../../model/organizations";
import { ActivatedRoute, Router } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
import { environment } from '../../../environments/environment';

@Component({
  selector: "app-application",
  templateUrl: "./application.component.html",
  styleUrls: ["./application.component.css"]
})
export class ApplicationComponent implements OnInit {
  url = environment.VOLUNTEER_HUB_API + "/getOrgById";
  emailURL = environment.VOLUNTEER_HUB_API + "/sendMail";
  org: Organizations;
  myForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  //Checks the id in the url, then displays organization that matches that id (should only be one, since they are unique id's)
  ngOnInit() {
    const org = this.route.snapshot.paramMap.get("id");

    this.http.get<Organizations>(`${this.url}/${org}`).subscribe(org => {
      this.org = org;
    });

    // Create an instance of form called FormGroup
    //   Validators is a built in FormControl value that requires the value and will disable the submit button on the form if it is not filled in
    //   Will also check if phone number is correct format
    this.myForm = new FormGroup({
      applicant: new FormControl("", [Validators.required]),
      contact: new FormControl("", [Validators.required,
        Validators.pattern('^[0-9]+$'),
        Validators.minLength(10),
        Validators.maxLength(10)])
    });
  }

  //This apply function will send an email to the creator of the organization so they can get in touch with the user that applied
  apply() {
    //Create JSON object that contains email and name of organization
    var orgEmail = {
      email: this.org.email,
      orgName: this.org.name
    };
    // Create a JSON object that contains the values of the form (applicant name and contact information), and organization that was applied to info
    const result = Object.assign({}, this.myForm.value, orgEmail);

    this.http.post<any>(this.emailURL, result).subscribe(
      //If successfully applied, user will receive notifcation and will be rerouted to list of organizations page
      data => {
        alert("Successfully applied!");
        this.router.navigate(["/organizations"]);
      }, //If there was an error, user will be notified
      error => {
        alert("There was an error applying.");
      }
    );
  }
}
