import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up-component',
  templateUrl: './sign-up-component.component.html',
  styleUrls: ['./sign-up-component.component.css']
})
export class SignUpComponentComponent implements OnInit {
  myForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      email: '',
      username: '',
      password: ''
    })


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
    })
  } 

  //Regex error handling
  get email() {
    return this.myForm.get('email');
  }

  get password() {
    return this.myForm.get('password');
  }

  get username() {
    return this.myForm.get('username');
  }

  //Test submit 
  onSubmit(data:any):void {
    console.log(data.value);
  }

}
