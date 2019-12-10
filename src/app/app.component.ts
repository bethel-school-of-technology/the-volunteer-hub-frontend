import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'VolunteerHub';
  staticPath: string = 'http://localhost:3001/staticposts';

  signUpPath = 'http://localhost:3001/users/signup';
}
