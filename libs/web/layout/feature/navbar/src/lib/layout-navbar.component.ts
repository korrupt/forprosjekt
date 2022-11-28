import { Component } from '@angular/core';
import { NavbarService } from '@forprosjekt/web/shared/data-access';

@Component({
  selector: 'forprosjekt-layout-navbar',
  templateUrl: './layout-navbar.component.html',
  styleUrls: ['./layout-navbar.component.scss'],
})
export class LayoutNavbarComponent {
  constructor(private navbar: NavbarService) {}

  button$ = this.navbar.latestProp$('button');
  title$ = this.navbar.latestProp$('title');
}
