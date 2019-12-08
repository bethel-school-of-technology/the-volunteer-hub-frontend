import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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

    //This shows all live changes to console
    this.myForm.valueChanges.subscribe(console.log);
  } 

  //Test submit 
  onSubmit(data) {
    console.log(data);
  }

}
