import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { User } from 'src/app/shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  authenticateWithUsernameAndPassword(username: string, password: string): Observable<User> {
    return this.http.post<User>(`${environment.authenticationApi}/login`, { username, password });
  }

  regusterUser(username: string, email: string, password: string): Observable<void> {
    return this.http.post<void>(`${environment.authenticationApi}/register`, { username, email, password });
  }

  confirmUser(username: string, code: string): Observable<User> {
    return this.http.post<User>(`${environment.authenticationApi}/confirm`, { username, code });
  }
}
