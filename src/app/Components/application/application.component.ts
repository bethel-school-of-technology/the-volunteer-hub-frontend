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

@Component({
  selector: "app-application",
  templateUrl: "./application.component.html",
  styleUrls: ["./application.component.css"]
})
export class ApplicationComponent implements OnInit {
  url = "http://localhost:3001/getOrgById";
  emailURL = "http://localhost:3001/sendMail";
  org: Organizations;
  myForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    const org = this.route.snapshot.paramMap.get("id");

    this.http.get<Organizations>(`${this.url}/${org}`).subscribe(org => {
      this.org = org;
    });

    this.myForm = new FormGroup({
      applicant: new FormControl("", [Validators.required]),
      contact: new FormControl("", [Validators.required])
    });
  }

  apply() {
    var orgEmail = {
      email: this.org.email,
      orgName: this.org.name
    };
    const result = Object.assign({}, this.myForm.value, orgEmail);

    this.http.post<any>(this.emailURL, result).subscribe(
      data => {
        alert("Successfully applied!");
        this.router.navigate(["/organizations"]);
      },
      error => {
        alert("There was an error applying.");
      }
    );
  }
}
