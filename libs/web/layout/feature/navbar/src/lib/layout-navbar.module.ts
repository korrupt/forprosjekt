import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutNavbarComponent } from './layout-navbar.component';
import { SpinButtonModule } from '@forprosjekt/web/layout/ui/spin-button';

@NgModule({
  imports: [CommonModule, SpinButtonModule],
  declarations: [LayoutNavbarComponent],
  exports: [LayoutNavbarComponent],
})
export class WebLayoutNavbarModule {}
