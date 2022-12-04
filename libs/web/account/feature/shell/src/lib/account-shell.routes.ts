import { Routes } from '@angular/router';

export const ACCOUNT_SHELL_ROUTES: Routes = [
  {
    path: 'settings',
    loadChildren: async () => (await import('@forprosjekt/web/account/feature/settings')).WebAccountSettingsModule,
  },
  {
    path: '',
    pathMatch: 'full',
    loadChildren: async () => (await import('@forprosjekt/web/account/feature/dashboard')).WebAccountDashboardModule,
  },
];
