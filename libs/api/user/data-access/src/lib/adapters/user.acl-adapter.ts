import { AuthUser } from '@forprosjekt/api/auth/utils';
import { AccessResource } from '@forprosjekt/shared/models';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { ApiUserService } from '../services';

@Injectable()
export class ApiUserAclAdapter {
  constructor(private user: ApiUserService) {}

  public async findUsers(auth: AuthUser) {
    const permission = auth.read(null, AccessResource.USER);
    if (!permission.granted) throw new ForbiddenException();

    const result = await this.user.findUsers();
    return permission.filter(result);
  }

  public async findUser(auth: AuthUser, id: string, throws?: boolean) {
    const permission = auth.read({ ownerId: id }, AccessResource.USER);
    if (!permission.granted) throw new ForbiddenException();

    const result = await this.user.findUser(id, throws);
    return permission.filter(result);
  }
}