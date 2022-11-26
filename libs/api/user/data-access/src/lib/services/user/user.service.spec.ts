import { Test, TestingModule } from '@nestjs/testing';
import { ApiUserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '@forprosjekt/api/user/utils';
import { Repository } from 'typeorm';

describe('UserService', () => {
  let service: ApiUserService;
  let user: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApiUserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    user = module.get<Repository<User>>(getRepositoryToken(User));
    service = module.get<ApiUserService>(ApiUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
