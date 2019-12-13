import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponentComponent } from './Components/sign-up-component/sign-up-component.component';
import { HomepageComponent } from './Components/homepage/homepage.component';
import { LoginuserComponent } from './loginuser/loginuser.component';


const routes: Routes = [
  { path: '',  component: HomepageComponent},
  { path: 'signup', component: SignUpComponentComponent },
  { path: 'login', component: LoginuserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [SignUpComponentComponent, HomepageComponent, LoginuserComponent]
