import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
  constructor(private router: Router) {}

  routes = navdrawerRoutes;

  public routeIsActive(link: NavdrawerRoute): boolean {
    const url = this.router.url.match(/^\/[^/]+/);
    return link.path == (url ? url[0] : '/');
  }
}
