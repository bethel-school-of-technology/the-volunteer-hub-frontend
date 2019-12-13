import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponentComponent } from './Components/sign-up-component/sign-up-component.component';
import { HomepageComponent } from './Components/homepage/homepage.component';
import { OrganizationsComponent } from './Components/organizations/organizations.component';
import { LoginuserComponent } from './Components/loginuser/loginuser.component';



const routes: Routes = [
  { path: '',  component: HomepageComponent},
  { path: 'signup', component: SignUpComponentComponent },
  { path: 'organizations', component: OrganizationsComponent },
  { path: 'login', component: LoginuserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


export const routingComponents = [SignUpComponentComponent, HomepageComponent, OrganizationsComponent, LoginuserComponent];
