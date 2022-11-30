import { UserModel } from '@forprosjekt/shared/models';
import { gql } from 'apollo-angular';

export interface AccountQueryResult {
  readonly user: UserModel;
}

export const AccountQuery = gql<AccountQueryResult, any>`
  query AccountQuery {
    user: me {
      id
      name
    }
  }
`;
