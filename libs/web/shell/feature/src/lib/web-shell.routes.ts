import { Routes } from '@angular/router';
import { LayoutShellComponent } from '@forprosjekt/web/layout/feature/shell';
import { IsLoggedInGuard } from '@forprosjekt/web/shared/data-access';

export const WEB_SHELL_ROUTES: Routes = [
  {
    path: '',
    component: LayoutShellComponent,
    children: [
      {
        path: 'auth',
        loadChildren: async () => (await import('@forprosjekt/web/auth/feature/shell')).WebAuthShellModule,
      },
      {
        path: 'account',
        loadChildren: async () => (await import('@forprosjekt/web/account/feature/shell')).WebAccountShellModule,
        canActivate: [IsLoggedInGuard],
      },
      {
        path: '**',
        loadChildren: async () => (await import('@forprosjekt/web/not-found/feature')).NotFoundModule,
      },
    ],
  },
];
