import { AccessResource, AccessRole } from '@forprosjekt/shared/models';
import { IAccessInfo } from 'nest-access-control';

export const UserPermissions: IAccessInfo[] = [
  { role: AccessRole.USER, resource: AccessResource.USER, action: 'read:own', attributes: ['*'] },
  { role: AccessRole.USER, resource: AccessResource.USER, action: 'update:own', attributes: ['!*', 'name'] },

  { role: AccessRole.USER, resource: AccessResource.BATTERY, action: 'read:own', attributes: ['*'] },
  { role: AccessRole.USER, resource: AccessResource.BATTERY, action: 'update:own', attributes: ['name'] },

  { role: AccessRole.USER, resource: AccessResource.USER_BATTERY, action: 'read:own', attributes: ['*'] },
];
