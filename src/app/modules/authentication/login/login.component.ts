import { AuthenticationService } from 'src/app/core/authentication';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(private formBuilder: FormBuilder, private router: Router, private _authenticationService: AuthenticationService) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(25)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(25)]],
    });
  }

  ngOnInit(): void {
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    if(this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    this._authenticationService.login(this.f.username.value, this.f.password.value).pipe(first()).subscribe(
      () => {
        this.loading = false;
        this.router.navigate(['dashboard']);
      },
      error => {
        this.loading = false;
        if (error.status == 404) {
          this.error = error.error.message;
        } else if (error.status == 403) {
          this.error = error.error.message;
        } else {
          this.error = 'Something went wrong. Please try again later.';
        }
      }
    );
  }
}
