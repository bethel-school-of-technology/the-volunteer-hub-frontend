import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule, routingComponents } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { PostsComponent } from "./Components/posts/posts.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ReactiveFormsModule } from "@angular/forms";

import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatChipsModule } from "@angular/material/chips";

import { LoginuserComponent } from "./Components/loginuser/loginuser.component";
import { NavbarComponent } from "./Components/navbar/navbar.component";
<<<<<<< Updated upstream
import { DetailedOrgComponent } from './Components/detailed-org/detailed-org.component';
=======
import { ProfileComponent } from './Components/profile/profile.component';
>>>>>>> Stashed changes

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    routingComponents,
    LoginuserComponent,
    NavbarComponent,
<<<<<<< Updated upstream
    DetailedOrgComponent
=======
    ProfileComponent
>>>>>>> Stashed changes
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatChipsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
