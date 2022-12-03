import { Component, OnDestroy } from '@angular/core';
import { WebAccountService } from '@forprosjekt/web/account/data-access';
import { NavbarService } from '@forprosjekt/web/shared/data-access';
import { map } from 'rxjs';

@Component({
  selector: 'forprosjekt-account-dashboard',
  templateUrl: './account-dashboard.component.html',
  styleUrls: ['./account-dashboard.component.scss'],
})
export class AccountDashboardComponent implements OnDestroy {
  constructor(private navbar: NavbarService, private account: WebAccountService) {}

  account$ = this.account.account$;

  name$ = this.account.account$.pipe(map(({ data }) => data.user.name));

  batteries$ = this.account$.pipe(map(({ data }) => data.user.batteries));

  private layer = this.navbar.registerNavbarLayer({
    title: 'Account',
    // button: 'home',
  });

  ngOnDestroy(): void {
    this.layer.release();
  }
}
