import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Organizations } from '../model/organizations';

@Injectable({
  providedIn: 'root'
})
export class CreateOrganizationService {

  url = 'http://localhost:3001/users/createOrg';

  constructor(private http: HttpClient) {}

  createOrganization(org: Organizations) {
    return this.http.post<any>(this.url, org);
  }

}
