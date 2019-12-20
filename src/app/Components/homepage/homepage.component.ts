import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from "@angular/router";
import { Organizations } from '../../model/organizations';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  searchForm: FormGroup;
  organization: Organizations;
  _url: string = 'http://localhost:3001/getOrgs/';
  
  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.searchForm = this.fb.group({
      state: ['', Validators.required]
    })
  }

  //access form fields
  get getFormValues() {
    return this.searchForm.controls;
  }

  search(){
    if (this.searchForm.invalid) {
      return;
    }

    let searchedState = this.getFormValues.state.value
    let correctedState = searchedState.charAt(0).toUpperCase() + searchedState.substring(1);
    console.log(correctedState);

    this.http.get<Organizations>(`${this._url}${correctedState}`)
    .subscribe(organization => {
      this.organization = organization;
      this.router.navigate(['/organizations', correctedState]);
      console.log(JSON.stringify(this.organization));
    })
  }
}
