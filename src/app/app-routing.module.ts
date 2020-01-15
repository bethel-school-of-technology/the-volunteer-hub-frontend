import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponentComponent } from './Components/sign-up-component/sign-up-component.component';
import { HomepageComponent } from './Components/homepage/homepage.component';
import { OrganizationsComponent } from './Components/organizations/organizations.component';
import { LoginuserComponent } from './Components/loginuser/loginuser.component';
import { DetailedOrgComponent } from './Components/detailed-org/detailed-org.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { ResolverService } from './Services/resolver.service';
import { EditOrganizationComponent } from './Components/edit-organization/edit-organization.component';
import { ApplicationComponent } from './Components/application/application.component';


const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'signup', component: SignUpComponentComponent },
  { path: 'organizations', component: OrganizationsComponent },
  { path: 'organizations/:state', component: DetailedOrgComponent },
  { path: 'login', component: LoginuserComponent },
  { path: 'profile', component: ProfileComponent, resolve: { user: ResolverService, org: ResolverService } },
  { path: 'organization/:id', component: EditOrganizationComponent },
  { path: 'apply/:id', component: ApplicationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


export const routingComponents = [
  SignUpComponentComponent,
  HomepageComponent,
  OrganizationsComponent,
  DetailedOrgComponent,
  LoginuserComponent,
  ProfileComponent,
  EditOrganizationComponent];
