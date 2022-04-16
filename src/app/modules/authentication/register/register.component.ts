import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';

import { AuthenticationService } from 'src/app/core/authentication';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(private formBuilder: FormBuilder, private router: Router, private toastr: ToastrService, private _authenticationService: AuthenticationService) {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(25)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(25)]],
    });
  }

  ngOnInit(): void { console.log('OnInit'); }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    if(this.registerForm.invalid) {
      return;
    }

    this.loading = true;

    this._authenticationService.register(this.f.username.value, this.f.email.value, this.f.password.value).pipe(first()).subscribe(
      () => {
        this.loading = false;
        this.toastr.info('Account created successfully. Please check your email to confirm your account.', 'Confirmation email sent');
        this.router.navigate(['confirm']);
      },
      error => {
        this.loading = false;
        if (error.status == 409) {
          this.error = error.error.message;
        } else {
          this.error = 'Something went wrong. Please try again later.';
        }
      }
    );
  }
}
