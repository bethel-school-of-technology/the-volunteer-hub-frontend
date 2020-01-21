import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { User } from "../../model/user";
import { HttpClient } from "@angular/common/http";
import { AuthenticationService } from "../../Services/authentication.service";
import { LoginService } from "../../Services/login.service";
import { Input } from "@angular/core";

@Component({
  selector: "app-loginuser",
  templateUrl: "./loginuser.component.html",
  styleUrls: ["./loginuser.component.css"]
})
export class LoginuserComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  user: User;
  private adminUrl = "http://localhost:3001/users/admin";

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private http: HttpClient,
    private _loginService: LoginService
  ) {}

  ngOnInit() {
    //Initialize form
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  // for accessing to form fields, with formBuilder you need to use this method to get the values
  get fval() {
    return this.loginForm.controls;
  }

  //When login is submitted
  onFormSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    //Calls authentication servicve login and passes the username and password that was passed in
    this.loading = true;
    this.authenticationService
      .login(this.fval.username.value, this.fval.password.value)
      .subscribe(
        data => {
          // check if user is admin reroute to admin page
          if (data.user.admin) {
            // create cookie in browser using token from backend
            document.cookie = `token=${data.token}`;
            let cookies = document.cookie;
            console.log(cookies);
            this.router.navigate(["/admin"]);
            console.log("login succesful");
          } else {
            //Here if user is not admin they are rerouted to profile page
            console.log(data);
            // create cookie in browser using token from backend
            document.cookie = `token=${data.token}`;
            let cookies = document.cookie;
            console.log(cookies);
            this.router.navigate(["/profile"]);
            console.log("login successful");
          }
        },
        error => {
          alert("Username or password does not exist.");
          console.log(this.fval.username.value, error);
          this.loading = false;
        }
      );
  }
}
