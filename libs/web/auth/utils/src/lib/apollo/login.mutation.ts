import { LoginWithEmailPasswordModel } from '@forprosjekt/shared/models';
import { gql } from 'apollo-angular';

export interface LoginMutationResult {
  readonly user: {
    access_token: string;
  };
}

export interface LoginMutationVariables {
  body: LoginWithEmailPasswordModel;
}

export const LoginMutation = gql<LoginMutationResult, LoginMutationVariables>`
  mutation LoginWithEmailPassword($body: LoginWithEmailPasswordDto!) {
    user: loginWithEmailPassword(body: $body) {
      access_token
    }
  }
`;
