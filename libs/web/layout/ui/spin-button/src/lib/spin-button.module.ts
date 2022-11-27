import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { SpinButtonComponent } from './spin-button.component';

@NgModule({
  imports: [CommonModule, MatButtonModule],
  declarations: [SpinButtonComponent],
  exports: [SpinButtonComponent],
})
export class SpinButtonModule {}
