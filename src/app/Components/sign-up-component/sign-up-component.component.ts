import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../model/user';
import { HttpClient } from '@angular/common/http';
import { Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sign-up-component',
  templateUrl: './sign-up-component.component.html',
  styleUrls: ['./sign-up-component.component.css']
})
export class SignUpComponentComponent implements OnInit {
  myForm: FormGroup;

  user: User;
  @Input() signupPath: string;

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  // User signup and storing the user in MongoDB
  signup(): Observable<User> {
    const result: User = Object.assign({}, this.myForm.value);
    console.log(result)
    console.log(this.myForm.value);
    return this.http.post<User>(this.signupPath, result);
    // user.email = this.myForm.value.email;
    // user.username = this.myForm.value.username;
    // user.password = this.myForm.value.password;
    // console.log(user);
    // return this.http.post<User>(this.signupPath, user);
  }



  ngOnInit() {


    this.myForm = this.fb.group({
      username: '',
      email: '',
      password: ''
    });


    this.myForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      username: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(10)
      ]],
      password: ['', [
        Validators.required,
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$')
      ]]
    });

    

  }

  // Regex error handling
  get email() {
    return this.myForm.get('email');
  }

  get password() {
    return this.myForm.get('password');
  }

  get username() {
    return this.myForm.get('username');
  }


}
