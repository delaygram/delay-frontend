import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public userSubject: BehaviorSubject<User>;

  constructor(private _authService: AuthService, private router: Router) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user') ?? '{}'));
  }

  public getUser(): User {
    return this.userSubject.value;
  }

  public login(username: string, password: string): Observable<User> {
    return this._authService.authenticateWithUsernameAndPassword(username, password).pipe(tap((user: User) => {
      localStorage.setItem('user', JSON.stringify(user));
      this.userSubject.next(user);

      return user;
    }));
  }

  public register(username: string, email: string, password: string): Observable<void> {
    return this._authService.regusterUser(username, email, password);
  }

  public confirm(username: string, code: string): Observable<User> {
    return this._authService.confirmUser(username, code);
  }

  public logout(): void {
    localStorage.removeItem('user');
    this.userSubject.next(new User());
    this.router.navigate(['login']);
  }


}
