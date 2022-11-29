import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WebAccountService } from '@forprosjekt/web/account/data-access';
import { of } from 'rxjs';

import { AccountDashboardComponent } from './account-dashboard.component';

class MockAccountService {
  account$ = of({ data: { user: { name: '123' } } });
}

describe('AccountDashboardComponent', () => {
  let component: AccountDashboardComponent;
  let fixture: ComponentFixture<AccountDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountDashboardComponent],
      providers: [
        {
          provide: WebAccountService,
          useClass: MockAccountService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
