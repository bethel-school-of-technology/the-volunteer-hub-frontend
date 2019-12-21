import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../model/user';
import { Organizations } from '../../model/organizations';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;
  orgs: Organizations[];
  private url = 'http://localhost:3001/users/profile';

  constructor(private http: HttpClient) { }

  getUserInfo() {
    return this.http.get<User>(this.url, { withCredentials: true }).subscribe(user => {
      this.user = user;
      console.log(JSON.stringify(user), document.cookie);
    });
  }

  ngOnInit() {
    this.getUserInfo();
  }

}




