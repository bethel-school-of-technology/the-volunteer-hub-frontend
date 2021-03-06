import { NgModule } from "@angular/core";
import {
  Routes,
  RouterModule,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { SignUpComponentComponent } from "./Components/sign-up-component/sign-up-component.component";
import { HomepageComponent } from "./Components/homepage/homepage.component";
import { OrganizationsComponent } from "./Components/organizations/organizations.component";
import { LoginuserComponent } from "./Components/loginuser/loginuser.component";
import { ProfileComponent } from "./Components/profile/profile.component";
import { ResolverService } from "./Services/resolver.service";
import { AdminComponent } from "./Components/admin/admin.component";
import { AuthGuard } from "./auth.guard";
import { EditOrganizationComponent } from "./Components/edit-organization/edit-organization.component";
import { ApplicationComponent } from "./Components/application/application.component";

//resolve: data is found before ngonInit is ran on page
//canActivate: Angular function which checks certain parameters before displaying the component, use 'ng generate Guard' to create, instead of regular 'ng generate service'
const routes: Routes = [
  { path: "", component: HomepageComponent },
  { path: "signup", component: SignUpComponentComponent },
  { path: "organizations", component: OrganizationsComponent },
  { path: "login", component: LoginuserComponent },
  {
    path: "profile",
    component: ProfileComponent,
    resolve: { user: ResolverService, org: ResolverService }
  },
  { path: "organization/:id", component: EditOrganizationComponent },
  { path: "apply/:id", component: ApplicationComponent },
  { path: "admin", component: AdminComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

//Exports all components in an array, so don't have to type each one specifically in app.module.ts
export const routingComponents = [
  SignUpComponentComponent,
  HomepageComponent,
  OrganizationsComponent,
  LoginuserComponent,
  ProfileComponent,
  EditOrganizationComponent
];
