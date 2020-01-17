import { Component, OnInit, ResolvedReflectiveFactory } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../model/user';
import { Organizations } from '../../model/organizations';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  orgForm: FormGroup;
  user: User;
  org: Organizations;
  organization: Organizations[];
  private url = 'http://localhost:3001/users/userOrgs';
  private createOrgUrl = 'http://localhost:3001/users/createOrg';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    ) {
    route.data.subscribe(data => {
      // tslint:disable-next-line: no-string-literal
      this.user = data['user'];
    });
  }

  ngOnInit() {
    this.http.get<Organizations[]>(this.url, { withCredentials: true }).subscribe(organization => {
      this.organization = organization;
      console.log(JSON.stringify(organization));
    });

    this.orgForm = new FormGroup({
      name: new FormControl('', [
        Validators.required
      ]),
      city: new FormControl('', [
        Validators.required
      ]),
      state: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]+$'),
        Validators.minLength(10),
        Validators.maxLength(10)
      ]),
      description: new FormControl('', [
        Validators.required
      ])
    });
  }

  async orgUrl() {
    const result: Organizations = Object.assign({}, this.orgForm.value);
    return this.http.post<any>(this.createOrgUrl, result, { withCredentials: true }).subscribe();
  }

  createOrg() {
    this.orgUrl().then(
      newOrg => {

        // location.reload();

        console.log('Your new organization has been posted.', newOrg);
        alert('Your organization has been posted!');
        this.router.navigate(['/organizations']);
      },
      err => console.log('Error!', err)
    );
  }
}




