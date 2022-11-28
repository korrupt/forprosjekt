import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutNavdrawerComponent } from './layout-navdrawer.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { WebLayoutNavbarModule } from '@forprosjekt/web/layout/feature/navbar';

@NgModule({
  imports: [CommonModule, MatSidenavModule, WebLayoutNavbarModule],
  declarations: [LayoutNavdrawerComponent],
  exports: [LayoutNavdrawerComponent],
})
export class WebLayoutNavdrawerModule {}
