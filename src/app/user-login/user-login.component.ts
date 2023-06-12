import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ObserversModule } from '@angular/cdk/observers';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
})
export class UserLoginComponent implements OnInit {
  public errorMessage!: string;

  loginForm!: FormGroup;
  isAutheticated!: boolean;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, this.caseSensitiveValidator]],
      password: ['', [Validators.required, this.caseSensitiveValidator]],
    });
  }
  caseSensitiveValidator(control: FormControl): { [key: string]: any } | null {
    const value = control.value;
    const isCaseSensitive = value === value.toLowerCase();
    return isCaseSensitive ? null : { caseSensitive: true };
  }

  login() {
    this.authService.login(
      this.loginForm.get('username')?.value,
      this.loginForm.get('password')?.value
    );
    this.authService
      .isAuthenticatedLogin()
      .subscribe((isLogin) => (this.isAutheticated = isLogin));
    if (this.isAutheticated) this.router.navigate(['/dashboard']);
    else {
      this.errorMessage = 'Incorrect username or password. Please try again.';
    }
  }
}
