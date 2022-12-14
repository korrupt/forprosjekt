import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { isApolloError } from '@apollo/client/errors';
import { LoginWithEmailPasswordModel } from '@forprosjekt/shared/models';
import { LoginMutation } from '@forprosjekt/web/auth/utils';
import { NavbarService, WebAuthService } from '@forprosjekt/web/shared/data-access';
import { Apollo } from 'apollo-angular';
import { catchError, EMPTY } from 'rxjs';

@Component({
  selector: 'forprosjekt-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss'],
})
export class AuthLoginComponent implements OnDestroy {
  constructor(
    private navbar: NavbarService,
    private fb: FormBuilder,
    private apollo: Apollo,
    private auth: WebAuthService,
    private router: Router,
  ) {}

  loading = false;
  error?: string;

  get valid() {
    return this.formGroup.valid;
  }

  private layer = this.navbar.registerNavbarLayer({
    title: 'Login',
  });

  readonly formGroup = this.fb.group({
    email: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
  });

  submit(event: Event) {
    event.preventDefault();
    const body = this.formGroup.value as LoginWithEmailPasswordModel;
    this.error = undefined;
    this.loading = true;

    this.apollo
      .mutate({
        mutation: LoginMutation,
        variables: { body },
      })
      .pipe(
        catchError((err) => {
          this.loading = false;

          if (isApolloError(err)) {
            this.error = err.message;
          } else {
            this.error = 'Error.';
          }

          return EMPTY;
        }),
      )
      .subscribe(({ data }) => {
        if (!data) return;

        const access_token = data.user.access_token;
        this.auth.login(access_token);
        this.loading = false;

        this.router.navigateByUrl('/account');
      });
  }

  ngOnDestroy(): void {
    this.layer.release();
  }
}
