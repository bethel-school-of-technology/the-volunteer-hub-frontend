import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import { Organizations } from "../../model/organizations";
import { environment } from '../../../environments/environment';

@Component({
  selector: "app-homepage",
  templateUrl: "./homepage.component.html",
  styleUrls: ["./homepage.component.css"]
})
export class HomepageComponent implements OnInit {
  searchForm: FormGroup;
  organization: Organizations;
  _url: string = environment.VOLUNTEER_HUB_API + "/getOrgs/";

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    //Create form using formbuilder
    this.searchForm = this.fb.group({
      state: ["", Validators.required]
    });
  }

  // access form fields
  get getFormValues() {
    return this.searchForm.controls;
  }

  //Function that reroutes to application page of that organization
  reRoute(org) {
    var orgId = org._id;
    console.log(orgId);
    this.router.navigate(["/apply", orgId]);
  }

  //Search function
  search() {
    if (this.searchForm.invalid) {
      return;
    }

    const searchedState = this.getFormValues.state.value;
    //correctedState capitalizes the first letter of the searched state, just incase user misttyped
    const correctedState =
      searchedState.charAt(0).toUpperCase() + searchedState.substring(1);

    //Finds organizations in the state that was searched and displays them on the page
    this.http
      .get<Organizations>(`${this._url}${correctedState}`)
      .subscribe(organization => {
        this.organization = organization;
      });
  }
}
