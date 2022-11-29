import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AccountDashboardComponent } from './account-dashboard.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [AccountDashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: AccountDashboardComponent }]),
    MatProgressSpinnerModule,
  ],
})
export class WebAccountDashboardModule {}
