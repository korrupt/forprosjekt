import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WEB_SHELL_ROUTES } from './web-shell.routes';
import { WebLayoutShellModule } from '@forprosjekt/web/layout/feature/shell';

import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ApolloLink, InMemoryCache } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { IsLoggedInGuard, WebAuthService } from '@forprosjekt/web/shared/data-access';
import { lastValueFrom, take } from 'rxjs';

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(WEB_SHELL_ROUTES), WebLayoutShellModule, ApolloModule, HttpClientModule],
  exports: [RouterModule],
  providers: [
    WebAuthService,
    IsLoggedInGuard,
    {
      provide: APP_INITIALIZER,
      useFactory: (auth: WebAuthService) => () => {
        auth.init();
      },
      deps: [WebAuthService],
      multi: true,
    },
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink, webAuth: WebAuthService) => {
        const auth = setContext(async () => {
          const token = await lastValueFrom(webAuth.token$.pipe(take(1)));

          if (!token) {
            return {};
          } else {
            return {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            };
          }
        });

        const link = ApolloLink.from([auth, httpLink.create({ uri: '/graphql' })]);
        const cache = new InMemoryCache();

        return {
          link,
          cache,
        };
      },
      deps: [HttpLink, WebAuthService],
    },
  ],
})
export class WebShellModule {}
