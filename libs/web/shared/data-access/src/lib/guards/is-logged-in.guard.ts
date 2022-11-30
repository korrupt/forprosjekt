import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable, take, tap } from 'rxjs';
import { WebAuthService } from '../services';

@Injectable({ providedIn: 'root' })
export class IsLoggedInGuard implements CanActivate, CanLoad {
  constructor(private auth: WebAuthService, private router: Router) {}

  loggedIn$ = this.auth.loggedIn$.pipe(
    take(1),
    tap((loggedIn) => {
      if (!loggedIn) {
        this.router.navigateByUrl('/auth');
      }
    }),
  );

  canActivate(): Observable<boolean> {
    return this.loggedIn$;
  }

  canLoad(): Observable<boolean> {
    return this.loggedIn$;
  }
}
