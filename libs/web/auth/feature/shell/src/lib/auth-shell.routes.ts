import { Routes } from '@angular/router';

export const AUTH_SHELL_ROUTES: Routes = [
  {
    path: 'login',
    loadChildren: async () => (await import('@forprosjekt/web/auth/feature/login')).WebAuthLoginModule,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
];
