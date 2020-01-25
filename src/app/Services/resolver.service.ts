import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs";
import { User } from "../model/user";
import { Organizations } from "../model/organizations";
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: "root"
})
export class ResolverService implements Resolve<User> {
  constructor(private http: HttpClient) {}
  //Resolve is used by angular to load data before ngoninit is ran

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<User> {
    return this.http.get<User>(environment.VOLUNTEER_HUB_API + "/users/userProfile", {
      withCredentials: true
    });
  }

  resolveOrg(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Organizations> {
    return this.http.post<Organizations>(
      environment.VOLUNTEER_HUB_API + "/users/createOrg",
      { withCredentials: true }
    );
  }
}
