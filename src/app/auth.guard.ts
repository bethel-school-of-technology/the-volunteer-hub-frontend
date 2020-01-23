import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from "./Services/authentication.service";
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private auth: AuthenticationService, private router: Router, private http: HttpClient){}

  //canActivate of built in angular Guard 
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      //Checks if user is admin returns true, and opposite if not
      if (this.auth.checkAdmin()) {
        console.log('true');
        return true;
      } else {
        this.router.navigate(['/profile']);
        console.log('Permission denied');
        alert('Permission denied');
        return false;
      }
  }
}
