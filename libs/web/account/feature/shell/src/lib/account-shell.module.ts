import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ACCOUNT_SHELL_ROUTES } from './account-shell.routes';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(ACCOUNT_SHELL_ROUTES)],
})
export class WebAccountShellModule {}
