import { BatteryManagerType } from '@forprosjekt/shared/models';
import { gql } from 'apollo-angular';

export interface AccountQueryResult {
  readonly user: {
    __typename: string;
    id: string;
    name: string;
    batteries: {
      type: BatteryManagerType;
      battery: {
        name: string;
        latest: {
          data: any;
        };
      };
    }[];
  };
}

export const AccountQuery = gql<AccountQueryResult, any>`
  query AccountQuery {
    user: me {
      __typename
      id
      name
      batteries {
        type
        battery {
          name
          latest {
            data
          }
        }
      }
    }
  }
`;
