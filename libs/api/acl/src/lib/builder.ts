import { AccessRole } from '@forprosjekt/shared/models';
import { RolesBuilder } from 'nest-access-control';
import { AdminPermissions, UserPermissions } from './permissions';

const permissions = [...UserPermissions, ...AdminPermissions];
const builder = new RolesBuilder(permissions);

const roles = Object.values(AccessRole); // add all roles to prevent exception
builder.grant(roles);

export { builder };
