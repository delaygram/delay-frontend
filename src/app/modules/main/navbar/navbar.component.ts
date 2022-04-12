import { AuthenticationService } from './../../../core/authentication/authentication.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public user!: User;

  constructor(private readonly _authenticationService: AuthenticationService) { }

  ngOnInit() {
    this._authenticationService.userSubject.subscribe((user: User) => this.user = user);
  }

  logout() {
    this._authenticationService.logout();
  }

}
