import { AccessResource, AccessRole, JwtPayload } from '@forprosjekt/shared/models';
import { Permission } from 'nest-access-control';
import { builder } from '@forprosjekt/api/acl';

export class AuthUser {
  constructor(private payload?: JwtPayload | false) {}

  get id(): string | undefined {
    return this.payload ? this.payload.id : undefined;
  }

  get roles(): AccessRole[] {
    return [AccessRole.ANON, ...((this.payload && this.payload.roles) || [])];
  }

  private getOwnership<T extends { ownerId: string }>(entity: T): 'own' | 'any' {
    return entity.ownerId == this.id ? 'own' : 'any';
  }

  private access<T extends { ownerId: string }>(
    action: 'create' | 'read' | 'update' | 'delete',
    entity: T | null,
    resource: AccessResource,
  ): Permission {
    const possession = entity ? this.getOwnership(entity) : 'any';
    const role = this.roles;
    const permission = builder.permission({ possession, resource, action, role });

    return permission;
  }

  public create<T extends { ownerId: string }>(entity: T, resource: AccessResource) {
    return this.access('create', entity, resource);
  }

  public read<T extends { ownerId: string }>(entity: T, resource: AccessResource) {
    return this.access('read', entity, resource);
  }

  public update<T extends { ownerId: string }>(entity: T, resource: AccessResource) {
    return this.access('update', entity, resource);
  }

  public delete<T extends { ownerId: string }>(entity: T, resource: AccessResource) {
    return this.access('delete', entity, resource);
  }
}
