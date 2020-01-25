import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Organizations } from "../../model/organizations";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { environment } from '../../../environments/environment';


@Component({
  selector: "app-organizations",
  templateUrl: "./organizations.component.html",
  styleUrls: ["./organizations.component.css"]
})
export class OrganizationsComponent implements OnInit {
  organization: Organizations[];
  organ: Organizations;
  _url: string = environment.VOLUNTEER_HUB_API + "/getOrgs";
  _url_specific: string = environment.VOLUNTEER_HUB_API + "/getOrgs/";
  searchForm: FormGroup;

  constructor(private _http: HttpClient, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    //Create search form with formbuilder
    this.searchForm = this.fb.group({
      state: [""]
    })

    //Display list of organizations
    this._http.get<Organizations[]>(this._url).subscribe(organization => {
      this.organization = organization;
    });
  }


  // access form fields
  get getFormValues() {
    return this.searchForm.controls;
  }

  //When a searched organization is clicked it will route to the apply page
  reRoute(org) {
    var orgId = org._id;
    console.log(orgId);
    this.router.navigate(["/apply", orgId]);
  }

    //Search function
    search(){
      if (this.searchForm.invalid) {
        return;
      }

      const searchedState = this.getFormValues.state.value
      //Changes first letter to be capitalized in the search request
      const correctedState = searchedState.charAt(0).toUpperCase() + searchedState.substring(1);

      //Gets organizations searched for and displays them on the page
      this._http.get<Organizations>(`${this._url_specific}${correctedState}`)
        .subscribe(organization => {
          this.organ = organization;
        })
    }

  }

