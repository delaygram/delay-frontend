import { Router } from '@angular/router';
import { AuthService } from '../services';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from 'src/app/shared/models';

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
    return this.authenticateWithUsernameAndPassword(username, password);
  }

  private authenticateWithUsernameAndPassword(username: string, password: string) {
    return this._authService.authenticateWithUsernameAndPassword(username, password).pipe(tap((user: User) => {
      localStorage.setItem('user', JSON.stringify(user));
      this.userSubject.next(user);

      return user;
    }));
  }

  public register(username: string, email: string, password: string): Observable<void> {
    return this.registerUser(username, email, password);
  }

  private registerUser(username: string, email: string, password: string) {
    return this._authService.registerUser(username, email, password);
  }

  public confirm(username: string, code: string): Observable<User> {
    return this.confirmUser(username, code);
  }

  private confirmUser(username: string, code: string) {
    return this._authService.confirmUser(username, code).pipe(tap((user: User) => {
      localStorage.setItem('user', JSON.stringify(user));
      this.userSubject.next(user);
      return user;
    }));
  }

  public logout(): void {
    localStorage.removeItem('user');
    this.userSubject.next(new User());

    this.router.navigate(['login']);
  }

}
