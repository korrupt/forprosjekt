import { Injectable } from '@angular/core';
import { AccountQuery, UpdateNameMutation } from '@forprosjekt/web/account/utils';
import { Apollo } from 'apollo-angular';
import { switchMap, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebAccountService {
  constructor(private apollo: Apollo) {}

  private account = this.apollo.watchQuery({
    query: AccountQuery,
    pollInterval: 500,
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'network-only',
  });

  public readonly account$ = this.account.valueChanges;

  public updateAccountName(name: string) {
    return this.account$.pipe(
      take(1),
      switchMap(({ data }) =>
        this.apollo.mutate({
          mutation: UpdateNameMutation,
          variables: {
            userId: data.user.id,
            body: { name },
          },
          update: (store, { data }) => {
            const cache = store.readQuery({ query: AccountQuery });

            if (!cache || !data?.user) {
              console.error(`No account in cachce`);
              return;
            }

            const user = {
              ...cache.user,
              name,
            };

            store.writeQuery({ query: AccountQuery, data: { user } });
          },
        }),
      ),
    );
  }
}
