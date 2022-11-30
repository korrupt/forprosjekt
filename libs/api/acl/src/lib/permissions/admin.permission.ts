import { AccessResource, AccessRole } from '@forprosjekt/shared/models';
import { IAccessInfo } from 'nest-access-control';

export const AdminPermissions: IAccessInfo[] = Object.values(AccessResource).flatMap((resource) => [
  { role: AccessRole.ADMIN, resource, action: 'create:own', attributes: ['*'] },
  { role: AccessRole.ADMIN, resource, action: 'create:any', attributes: ['*'] },
  { role: AccessRole.ADMIN, resource, action: 'read:own', attributes: ['*'] },
  { role: AccessRole.ADMIN, resource, action: 'read:any', attributes: ['*'] },
  { role: AccessRole.ADMIN, resource, action: 'update:own', attributes: ['*'] },
  { role: AccessRole.ADMIN, resource, action: 'update:any', attributes: ['*'] },
  { role: AccessRole.ADMIN, resource, action: 'delete:own', attributes: ['*'] },
  { role: AccessRole.ADMIN, resource, action: 'delete:any', attributes: ['*'] },
]);
