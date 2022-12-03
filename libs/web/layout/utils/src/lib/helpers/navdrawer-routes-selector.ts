import { NavdrawerRoute } from '../interfaces';

const LOGGED_IN_ROUTES: NavdrawerRoute[] = [
  { path: 'account/dashboard', icon: 'home', name: 'Dashboard', group: 'For you' },
];
const DEFAULT_ROUTES: NavdrawerRoute[] = [{ path: '/', icon: 'home', name: 'Home' }];

export function navdrawerRoutesSelector(loggedIn: boolean) {
  return loggedIn ? DEFAULT_ROUTES.concat(LOGGED_IN_ROUTES) : DEFAULT_ROUTES;
}
