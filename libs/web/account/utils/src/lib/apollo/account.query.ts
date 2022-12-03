import { BatteryManagerType } from '@forprosjekt/shared/models';
import { gql } from 'apollo-angular';

export interface AccountQueryResult {
  readonly user: {
    id: string;
    name: string;
    batteries: {
      type: BatteryManagerType;
      battery: {
        name: string;
      };
    }[];
  };
}

export const AccountQuery = gql<AccountQueryResult, any>`
  query AccountQuery {
    user: me {
      id
      name
      batteries {
        type
        battery {
          name
        }
      }
    }
  }
`;
