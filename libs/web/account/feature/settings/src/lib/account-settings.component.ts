import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { WebAccountService } from '@forprosjekt/web/account/data-access';
import { NavbarService } from '@forprosjekt/web/shared/data-access';
import { take } from 'rxjs';

@Component({
  selector: 'forprosjekt-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss'],
})
export class AccountSettingsComponent implements OnDestroy, OnInit {
  constructor(private navbar: NavbarService, private fb: FormBuilder, private account: WebAccountService) {}

  userFormGroup = this.fb.group({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  get userFormGroupValid(): boolean {
    return this.userFormGroup.valid && this.userFormGroup.dirty;
  }

  private layer = this.navbar.registerNavbarLayer({
    title: 'Account',
  });

  submitUserFormGroup(event: Event) {
    event.preventDefault();
    const name = this.userFormGroup.controls.name.value;
    this.account.updateAccountName(name).subscribe((result) => {
      this.userFormGroup.markAsPristine();
    });
  }

  ngOnInit(): void {
    this.account.account$.pipe(take(1)).subscribe((account) => {
      if (account.data.user.name) {
        this.userFormGroup.controls.name.setValue(account.data.user.name);
      }
    });
  }

  ngOnDestroy(): void {
    this.layer.release();
  }
}
