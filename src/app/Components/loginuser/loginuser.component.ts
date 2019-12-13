import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
 
import { AuthenticationService } from '../../Services/authentication.service';

@Component({
  selector: 'app-loginuser',
  templateUrl: './loginuser.component.html',
  styleUrls: ['./loginuser.component.css']
})
export class LoginuserComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
   
  constructor(
  private formBuilder: FormBuilder,
  private route: ActivatedRoute,
  private router: Router,
  private authenticationService : AuthenticationService
  ) { }
   
  ngOnInit() {
  this.loginForm = this.formBuilder.group({
  username: ['', Validators.required],
  password: ['', Validators.required]
  });
   
  }
   
  // for accessing to form fields
  get fval() { return this.loginForm.controls; }
   
  onFormSubmit() {
  this.submitted = true;
  if (this.loginForm.invalid) {
  return;
  }
   
  this.loading = true;
  this.authenticationService.login(this.fval.username.value, this.fval.password.value)
  .subscribe(
  data => {
  this.router.navigate(['/']);
  console.log("login successful");
  },
  error => {
  alert ('Error');
  this.loading = false;
  });
  }
  }
   
