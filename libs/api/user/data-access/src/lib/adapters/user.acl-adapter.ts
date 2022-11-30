import { AuthUser } from '@forprosjekt/api/auth/utils';
import { UpdateUserDto } from '@forprosjekt/api/user/utils';
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
    const result = await this.user.findUser(id, throws);
    const permission = auth.read(result, AccessResource.USER);
    if (!permission.granted) throw new ForbiddenException();

    return permission.filter(result);
  }

  public async updateUser(auth: AuthUser, id: string, body: UpdateUserDto) {
    const user = await this.user.findUser(id);

    const updatePermission = auth.update(user, AccessResource.USER);
    if (!updatePermission.granted) throw new ForbiddenException();

    const filteredDto = updatePermission.filter(body);
    const result = await this.user.updateUser(id, filteredDto);

    const readPermission = auth.read(result, AccessResource.USER);
    if (!readPermission.granted) throw new ForbiddenException();

    return readPermission.filter(result);
  }
}
