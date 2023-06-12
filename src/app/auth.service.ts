import { Injectable } from '@angular/core';
import { LoginCredentials } from './login.interface';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject(false);

  isAuthenticatedLogin() {
    return this.isAuthenticated;
  }
  private readonly loginCredentials: LoginCredentials = {
    username: 'fingent',
    password: 'fingent',
  };

  login(loginFormUsername: any, LoginFormPassword: any) {
    if (
      this.loginCredentials.username == loginFormUsername &&
      this.loginCredentials.password == LoginFormPassword
    ) {
      localStorage.setItem('token', 'abcdefg');
      this.isAuthenticated.next(true);
    }
  }
}
