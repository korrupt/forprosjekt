import { Injectable } from '@angular/core';
import { AccountQuery } from '@forprosjekt/web/account/utils';
import { Apollo } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class WebAccountService {
  constructor(private apollo: Apollo) {}

  private account = this.apollo.watchQuery({
    query: AccountQuery,
  });

  public readonly account$ = this.account.valueChanges;
}
