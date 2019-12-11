import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { User } from '../../model/user';
import { HttpClient } from '@angular/common/http';
import { Input } from '@angular/core';
import { Observable } from 'rxjs';
import { SignupService } from '../../Services/signup.service';

@Component({
  selector: 'app-sign-up-component',
  templateUrl: './sign-up-component.component.html',
  styleUrls: ['./sign-up-component.component.css']
})
export class SignUpComponentComponent implements OnInit {
  myForm: FormGroup;

  constructor(private http: HttpClient, private _signUpService : SignupService) { }


  signup() {
    const result: User = Object.assign({}, this.myForm.value);
    console.log(result);

    this._signUpService.signup(result).subscribe(
      data => console.log('Successs!', data),
      error => console.error('Error!', error)
    )
  }


  ngOnInit() {
    this.myForm = new FormGroup({
      username: new FormControl('', Validators.required),
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
}