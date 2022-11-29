import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AUTH_SHELL_ROUTES } from './auth-shell.routes';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(AUTH_SHELL_ROUTES)],
})
export class WebAuthShellModule {}
