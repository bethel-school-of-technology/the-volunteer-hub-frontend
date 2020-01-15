import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Organizations } from '../../model/organizations';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {
  url = 'http://localhost:3001/getOrgById';
  org: Organizations;

  constructor(    private route: ActivatedRoute,
    private http: HttpClient) { }

  ngOnInit() {
    const org = this.route.snapshot.paramMap.get('id');

    this.http.get<Organizations>(`${this.url}/${org}`).subscribe(org => {
      this.org = org;
    })
  }

  apply() {
    window.open(`mailto:${this.org.email}`);
  }

}
