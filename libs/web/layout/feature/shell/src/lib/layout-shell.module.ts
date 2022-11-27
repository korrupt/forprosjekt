import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutShellComponent } from './layout-shell.component';

@NgModule({
  imports: [CommonModule],
  declarations: [LayoutShellComponent],
  exports: [LayoutShellComponent],
})
export class WebLayoutShellModule {}
