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
import { JwtModule } from "@auth0/angular-jwt";

import { LoginuserComponent } from "./Components/loginuser/loginuser.component";
import { NavbarComponent } from "./Components/navbar/navbar.component";
import { DetailedOrgComponent } from "./Components/detailed-org/detailed-org.component";
import { ProfileComponent } from "./Components/profile/profile.component";
import { ResolverService } from "./Services/resolver.service";
import { AdminComponent } from "./Components/admin/admin.component";
import { AuthGuard } from './auth.guard';
import { AuthenticationService } from './Services/authentication.service';

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    routingComponents,
    LoginuserComponent,
    NavbarComponent,
    DetailedOrgComponent,
    ProfileComponent,
    AdminComponent
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
  providers: [ResolverService, AuthGuard, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule {}
