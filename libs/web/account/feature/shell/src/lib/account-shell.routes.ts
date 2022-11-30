import { Routes } from '@angular/router';

export const ACCOUNT_SHELL_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: async () => (await import('@forprosjekt/web/account/feature/dashboard')).WebAccountDashboardModule,
  },
];
