import { Component, OnInit } from '@angular/core';
import { Organizations } from '../../model/organizations';
import { User } from '../../model/user';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-edit-organization',
  templateUrl: './edit-organization.component.html',
  styleUrls: ['./edit-organization.component.css']
})
export class EditOrganizationComponent implements OnInit {

  updateOrg = 'http://localhost:3001/users/updateOrg';
  orgUrl = 'http://localhost:3001/getOrgById';
  user: User;
  org: Organizations;
  // tslint:disable-next-line: variable-name,
  id: number;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {
    // route.data.subscribe(data => {
    //   // tslint:disable-next-line: no-string-literal
    //   this.user = data['user'];
    // });
  }

  // tslint:disable-next-line: variable-name
  // getOrgById(id: number): Observable<Organizations> {
  //   const url = `${this.orgUrl}/${id}`;
  //   return this.http.get<Organizations>(url)
  //     .pipe(map(orgs => orgs[0]),
  //       tap(o => {
  //         const outcome = o ? `fetched` : `did not find`;
  //         console.log(outcome);
  //       }),
  //     );
  // }

  ngOnInit() {
    let org = this.route.snapshot.paramMap.get('id');

    this.http.get<Organizations>(`${this.orgUrl}/${org}`).subscribe(org => {
      this.org = org;
      console.log(org);
    });
  //   this.route.params.subscribe(params => {
  //     // tslint:disable-next-line: no-string-literal
  //     this.id = +params['id'];
  //     this.getOrgById(this.id)
  //     .subscribe(o => this.org = o);
  //   });
  }

}
