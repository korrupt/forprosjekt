import { AccessRole } from './access-role.enum';

export interface JwtPayload {
  id: string;
  email: string;
  roles: AccessRole[];
}
