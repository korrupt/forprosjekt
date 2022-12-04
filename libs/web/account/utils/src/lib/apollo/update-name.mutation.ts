import { gql } from 'apollo-angular';

export interface UpdateNameMutationResult {
  readonly user: {
    readonly __typename: string;
    name: string;
  };
}

export interface UpdateNameMutationVariables {
  userId: string;
  body: {
    name: string;
  };
}

export const UpdateNameMutation = gql<UpdateNameMutationResult, UpdateNameMutationVariables>`
  mutation UpdateAccountName($userId: ID!, $body: UpdateUserDto!) {
    user: updateUser(userId: $userId, body: $body) {
      __typename
      name
    }
  }
`;
