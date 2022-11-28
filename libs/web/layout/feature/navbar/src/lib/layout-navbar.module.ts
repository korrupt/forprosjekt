import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutNavbarComponent } from './layout-navbar.component';
import { SpinButtonModule } from '@forprosjekt/web/layout/ui/spin-button';
import { FadeTextModule } from '@forprosjekt/web/layout/ui/fade-text';

@NgModule({
  imports: [CommonModule, SpinButtonModule, FadeTextModule],
  declarations: [LayoutNavbarComponent],
  exports: [LayoutNavbarComponent],
})
export class WebLayoutNavbarModule {}
