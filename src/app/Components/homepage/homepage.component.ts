import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  searchForm: FormGroup;
  
  constructor(private http: HttpClient, private fb: FormBuilder) { }

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
    console.log(this.getFormValues.state.value);
  }
}
