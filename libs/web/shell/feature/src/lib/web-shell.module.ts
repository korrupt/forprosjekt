import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WEB_SHELL_ROUTES } from './web-shell.routes';
import { WebLayoutShellModule } from '@forprosjekt/web/layout/feature/shell';

import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { HttpClientModule } from '@angular/common/http';
import { InMemoryCache } from '@apollo/client/core';

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(WEB_SHELL_ROUTES), WebLayoutShellModule, ApolloModule, HttpClientModule],
  exports: [RouterModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: async (link: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: link.create({
            uri: '/graphql',
          }),
        };
      },
      deps: [HttpLink],
    },
  ],
})
export class WebShellModule {}
