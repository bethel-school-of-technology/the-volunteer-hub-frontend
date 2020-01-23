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
    return this.http.get<User>("http://localhost:3001/users/userProfile", {
      withCredentials: true
    });
  }

  resolveOrg(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Organizations> {
    return this.http.post<Organizations>(
      "http://localhost:3001/users/createOrg",
      { withCredentials: true }
    );
  }
}
