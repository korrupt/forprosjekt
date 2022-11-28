import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { JwtPayload } from '@forprosjekt/shared/models';
import { Apollo } from 'apollo-angular';
import { BehaviorSubject, filter, map } from 'rxjs';

export interface WebAuthState {
  user?: JwtPayload;
  access_token?: string;
  loginAttempted: boolean;
}

const WEB_AUTH_LOCALSTORAGE_KEY = 'forprosjekt.web-auth';

@Injectable({
  providedIn: 'root',
})
export class WebAuthService {
  constructor(private apollo: Apollo, @Inject(PLATFORM_ID) private id: any) {}

  private state = new BehaviorSubject<WebAuthState>({ loginAttempted: false });
  public state$ = this.state.asObservable();

  public loggedIn$ = this.state$.pipe(
    filter(({ loginAttempted }) => loginAttempted),
    map(({ user }) => !!user),
  );

  // fix SSR
  private get localStorage(): Window['localStorage'] {
    if (isPlatformBrowser(this.id)) {
      return window['localStorage'];
    }

    return {
      setItem: (key, val) => null,
      getItem: (key) => null,
      clear: () => null,
      removeItem: () => null,
      length: 0,
      key: (idx) => null,
    };
  }

  private get access_token(): string | null {
    return this.localStorage.getItem(WEB_AUTH_LOCALSTORAGE_KEY);
  }

  private setToken(access_token: string): void {
    this.localStorage.setItem(WEB_AUTH_LOCALSTORAGE_KEY, access_token);
  }

  public init(): void {
    const access_token = this.access_token;
    if (access_token) {
      this.state.next({ ...this.state.value, loginAttempted: true, access_token });
    } else {
      this.state.next({ loginAttempted: true });
    }
  }
}
