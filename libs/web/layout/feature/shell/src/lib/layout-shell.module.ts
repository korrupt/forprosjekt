import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutShellComponent } from './layout-shell.component';
import { WebLayoutNavbarModule } from '@forprosjekt/web/layout/feature/navbar';

@NgModule({
  imports: [CommonModule, WebLayoutNavbarModule],
  declarations: [LayoutShellComponent],
  exports: [LayoutShellComponent],
})
export class WebLayoutShellModule {}
