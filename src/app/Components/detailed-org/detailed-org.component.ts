import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Organizations } from '../../model/organizations';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-detailed-org',
  templateUrl: './detailed-org.component.html',
  styleUrls: ['./detailed-org.component.css']
})
export class DetailedOrgComponent implements OnInit {
  // tslint:disable-next-line: variable-name
  _url = 'http://localhost:3001/getOrgs';
  organization: Organizations[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _http: HttpClient
  ) { }

  ngOnInit() {
    let state = this.route.snapshot.paramMap.get('state');

    this._http.get<Organizations[]>(`${this._url}/${state}`).subscribe(organization => {
      this.organization = organization;
    });
  }

}
