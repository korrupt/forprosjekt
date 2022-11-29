import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AccountDashboardComponent } from './account-dashboard.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [AccountDashboardComponent],
  imports: [CommonModule, RouterModule.forChild([{ path: '', component: AccountDashboardComponent }]), MatCardModule],
})
export class WebAccountDashboardModule {}
