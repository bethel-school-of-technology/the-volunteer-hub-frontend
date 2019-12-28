import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { User } from '../../model/user';
import { HttpClient } from '@angular/common/http';
import { Input } from '@angular/core';
import { Observable } from 'rxjs';
import { SignupService } from '../../Services/signup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up-component',
  templateUrl: './sign-up-component.component.html',
  styleUrls: ['./sign-up-component.component.css']
})
export class SignUpComponentComponent implements OnInit {
  myForm: FormGroup;

  constructor(private http: HttpClient, private _signUpService: SignupService, private router: Router) { }

  ngOnInit() {
    this.myForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(10)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$')
      ])
    });
  }

  async routeURL() {
    const result: User = Object.assign({}, this.myForm.value);
    return this._signUpService.signup(result).subscribe();
  }

  signup() {
    this.routeURL().then(
      data => {
        this.router.navigate(['/login']);
        console.log('Successs!', data);
      },
      error => console.error('Error!', error)
    );
  }
}