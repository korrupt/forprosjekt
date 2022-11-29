import { Component, OnDestroy } from '@angular/core';
import { NavbarService } from '@forprosjekt/web/shared/data-access';

@Component({
  selector: 'forprosjekt-account-dashboard',
  templateUrl: './account-dashboard.component.html',
  styleUrls: ['./account-dashboard.component.scss'],
})
export class AccountDashboardComponent implements OnDestroy {
  constructor(private navbar: NavbarService) {}

  private layer = this.navbar.registerNavbarLayer({
    title: 'Account',
  });

  ngOnDestroy(): void {
    this.layer.release();
  }
}
