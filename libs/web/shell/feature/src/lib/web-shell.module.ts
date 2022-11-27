import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WEB_SHELL_ROUTES } from './web-shell.routes';
import { WebLayoutShellModule } from '@forprosjekt/web/layout/feature/shell';

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(WEB_SHELL_ROUTES), WebLayoutShellModule],
  exports: [RouterModule],
})
export class WebShellModule {}
