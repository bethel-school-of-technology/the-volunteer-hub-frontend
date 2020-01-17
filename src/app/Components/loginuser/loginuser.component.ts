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
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  // for accessing to form fields
  get fval() {
    return this.loginForm.controls;
  }

  onFormSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService
      .login(this.fval.username.value, this.fval.password.value)
      .subscribe(
        data => {
          console.log(data);

          // check if user is admin
          if (data.user.admin) {
            this.router.navigate(["/admin"]);
          } else {
            this.router.navigate(["/profile"]);
          }

          console.log("login succesful");
        },
        error => {
          alert("Username or password does not exist.");
          console.log(this.fval.username.value, error);
          this.loading = false;
        }
      );
  }
}
