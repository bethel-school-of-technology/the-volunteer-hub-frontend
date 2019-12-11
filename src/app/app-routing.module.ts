import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponentComponent } from './Components/sign-up-component/sign-up-component.component';
import { HomepageComponent } from './Components/homepage/homepage.component';


const routes: Routes = [
  { path: 'signup', component: SignUpComponentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [SignUpComponentComponent, HomepageComponent]
