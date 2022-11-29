import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarService, WebAuthService } from '@forprosjekt/web/shared/data-access';
import { Apollo, MutationResult } from 'apollo-angular';
import { AuthLoginComponent } from './auth-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { map, of, timer } from 'rxjs';
import { LoginMutationResult } from '@forprosjekt/web/auth/utils';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

const layerStub = {
  release: jest.fn(),
};

describe('AuthLoginComponent', () => {
  let component: AuthLoginComponent;
  let fixture: ComponentFixture<AuthLoginComponent>;
  let apollo: Apollo;
  let webAuth: WebAuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [AuthLoginComponent],
      providers: [
        {
          provide: NavbarService,
          useValue: {
            registerNavbarLayer: jest.fn(() => layerStub),
          },
        },
        {
          provide: Apollo,
          useValue: {
            mutate: jest.fn(),
          },
        },
        {
          provide: WebAuthService,
          useValue: {
            login: jest.fn(),
          },
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthLoginComponent);
    component = fixture.componentInstance;
    apollo = TestBed.inject(Apollo);
    webAuth = TestBed.inject(WebAuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable submit', () => {
    component.formGroup.setValue({ email: '', password: '' });
    fixture.detectChanges();
    expect(component.valid).toBe(false);
  });

  describe('submit()', () => {
    it('should trigger loading and error', () => {
      jest.useFakeTimers();

      expect(component.loading).toBe(false);
      const mutation = timer(500).pipe(
        map(() => {
          throw new Error();
        }),
      );

      jest.mocked(apollo).mutate.mockImplementationOnce(() => mutation);
      component.submit(new Event('event'));

      expect(component.loading).toBe(true);

      jest.advanceTimersByTime(500);

      expect(component.loading).toBe(false);
      expect(component.error).toBeDefined();
    });

    it('should trigger login', () => {
      const returnValue: MutationResult<LoginMutationResult> = {
        loading: false,
        data: {
          user: { access_token: 'token' },
        },
      };

      const mutation = of(returnValue);
      jest.mocked(apollo).mutate.mockImplementationOnce(() => mutation);

      component.submit(new Event('event'));
      expect(webAuth.login).toHaveBeenCalled();
    });
  });
});
