import { JwtPayload } from '@forprosjekt/shared/models';

export class AuthUser {
  constructor(private payload: JwtPayload) {}

  get id(): string | undefined {
    return this.payload?.userId;
  }
}
