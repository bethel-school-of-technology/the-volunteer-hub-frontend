import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../model/user';
import { Organizations } from '../../model/organizations';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;
  organization: Organizations[];
  private url = 'http://localhost:3001/users/userOrgs';

  constructor(private http: HttpClient, private route: ActivatedRoute) { 
    route.data.subscribe(data => {
      this.user = data['user']
    })
  }

  ngOnInit() {
    // this.http.get<User>('http://localhost:3001/users/Userprofile', { withCredentials: true }).subscribe(user => {
    //   this.user = user;
    //   console.log(JSON.stringify(user), document.cookie);
    // });

    this.http.get<Organizations[]>(this.url, { withCredentials: true }).subscribe(organization => {
      this.organization = organization;
      console.log(JSON.stringify(organization));
    });
  }
}




