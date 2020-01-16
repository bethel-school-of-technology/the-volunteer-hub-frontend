import { NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SignUpComponentComponent } from './Components/sign-up-component/sign-up-component.component';
import { HomepageComponent } from './Components/homepage/homepage.component';
import { OrganizationsComponent } from './Components/organizations/organizations.component';
import { LoginuserComponent } from './Components/loginuser/loginuser.component';
import { DetailedOrgComponent } from './Components/detailed-org/detailed-org.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { ResolverService } from './Services/resolver.service';
import { AdminComponent } from './Components/admin/admin.component';
import { AuthGuard } from './auth.guard';



const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'signup', component: SignUpComponentComponent },
  { path: 'organizations', component: OrganizationsComponent },
  { path: 'organizations/:state', component: DetailedOrgComponent },
  { path: 'login', component: LoginuserComponent },
  { path: 'login', component: LoginuserComponent },
  { path: 'profile', component: ProfileComponent, resolve: { user: ResolverService, org: ResolverService } },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard]  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }


export const routingComponents = [
  SignUpComponentComponent,
  HomepageComponent,
  OrganizationsComponent,
  DetailedOrgComponent,
  LoginuserComponent,
  ProfileComponent];
