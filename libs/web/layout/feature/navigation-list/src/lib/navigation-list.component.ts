import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { navdrawerRoutesSelector } from '@forprosjekt/web/layout/utils';
import { WebAuthService } from '@forprosjekt/web/shared/data-access';
import { map } from 'rxjs';

interface NavdrawerRoute {
  path: string;
  icon: string;
  name: string;
}

const navdrawerRoutes: NavdrawerRoute[] = [
  {
    path: '/',
    icon: 'home',
    name: 'Home',
  },
];

@Component({
  selector: 'forprosjekt-navigation-list',
  templateUrl: './navigation-list.component.html',
  styleUrls: ['./navigation-list.component.scss'],
})
export class NavigationListComponent {
  constructor(private router: Router, private webAuth: WebAuthService) {}

  routes$ = this.webAuth.loggedIn$.pipe(map((isLoggedIn) => navdrawerRoutesSelector(isLoggedIn)));

  public routeIsActive(link: NavdrawerRoute): boolean {
    const url = this.router.url.match(/^\/[^/]+/);
    return link.path == (url ? url[0] : '/');
  }
}
