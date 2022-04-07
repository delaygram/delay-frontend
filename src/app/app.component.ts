import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from './core/authentication';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Delaygram';

  constructor(private readonly _authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {}

}
