import { Component } from '@angular/core';
import { AuthenticationService } from './registration-login/_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Evo Coin App';

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }
}
