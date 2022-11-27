import { Routes } from '@angular/router';
import { LayoutShellComponent } from '@forprosjekt/web/layout/feature/shell';

export const WEB_SHELL_ROUTES: Routes = [
  {
    path: '',
    component: LayoutShellComponent,
    children: [],
  },
];
