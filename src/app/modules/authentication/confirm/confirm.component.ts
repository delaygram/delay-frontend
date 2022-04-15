import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/authentication';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
  confirmForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(private formBuilder: FormBuilder, private router: Router, private toastr: ToastrService, private _authenticationService: AuthenticationService) {
    this.confirmForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      code: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern("^[0-9]*$")]]
    });
  }

  ngOnInit(): void {
  }

  get f() { return this.confirmForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.confirmForm.invalid) {
      return;
    }

    this.loading = true;

    this._authenticationService.confirm(this.f.username.value, this.f.code.value).pipe(first()).subscribe(
      () => {
        this.loading = false;
        this.toastr.success('Successfully confirmed account, try logging in', 'Confirm account');
        this.router.navigate(['login']);
      },
      error => {
        this.loading = false;

        if (error.status == 400) {
          this.error = error.error.message;
        }

        else this.error = "Something went wrong, please try again later."
      }
    );
  }

}
