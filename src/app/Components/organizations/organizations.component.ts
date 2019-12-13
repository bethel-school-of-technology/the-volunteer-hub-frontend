import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Organizations } from '../../model/organizations';


@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.css']
})
export class OrganizationsComponent implements OnInit {
  organization: Organizations[];
  _url: string = 'http://localhost:3001/getOrgs';

  constructor(private _http: HttpClient) { }

  ngOnInit() {
    this._http.get<Organizations[]>(this._url).subscribe(organization => {
      this.organization = organization
    });
  }

}
