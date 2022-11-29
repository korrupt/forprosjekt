import { Test, TestingModule } from '@nestjs/testing';
import { ApiUserAuthService } from './user-auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { LoginWithEmailPasswordDto, RegisterWithEmailPasswordDto, User, UserAuth } from '@forprosjekt/api/user/utils';
import { ApiAuthService } from '@forprosjekt/api/auth/data-access';
import { ForbiddenException } from '@nestjs/common';

import * as bcrypt from 'bcryptjs';

jest.mock('bcryptjs', () => ({
  genSalt: jest.fn(() => 'salt'),
  hash: jest.fn(() => 'hash'),
}));

describe('ApiUserAuthService', () => {
  let service: ApiUserAuthService;
  let userAuth: Repository<UserAuth>;
  let em: EntityManager;
  let auth: ApiAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApiUserAuthService,
        {
          provide: EntityManager,
          useValue: {
            transaction: jest.fn(),
            query: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(User),
          useValue: {
            save: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(UserAuth),
          useValue: {
            findOneBy: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: ApiAuthService,
          useValue: {
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ApiUserAuthService>(ApiUserAuthService);
    userAuth = module.get<Repository<UserAuth>>(getRepositoryToken(UserAuth));
    em = module.get<EntityManager>(EntityManager);
    auth = module.get<ApiAuthService>(ApiAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findUserAuthByEmail', () => {
    it('should return user.findOneBy', async () => {
      jest.mocked(userAuth).findOneBy.mockReturnValueOnce(null);
      const email = 'a@a.com';

      const result = await service['findUserAuthByEmail'](email);

      expect(userAuth.findOneBy).toHaveBeenCalledWith({ email });
      expect(result).toBeNull();
    });
  });

  describe('registerWithEmailPassword', () => {
    const body: RegisterWithEmailPasswordDto = { auth: { email: 'a@a', password: '123' }, user: { name: 'test' } };

    it('should throw if email is in use', async () => {
      jest.spyOn(service as any, 'findUserAuthByEmail').mockResolvedValueOnce({});

      await expect(service.registerWithEmailPassword(body)).rejects.toBeInstanceOf(ForbiddenException);
    });

    it('should return transaction result', async () => {
      const value = 'test';
      jest.mocked(em).transaction.mockResolvedValueOnce(value);
      jest.spyOn(service as any, 'generateUserId').mockResolvedValueOnce({ id: 'id' });

      const result = await service.registerWithEmailPassword(body);

      expect(em.transaction).toHaveBeenCalled();
      expect(result).toBe(value);
    });

    it('should create user and auth in transaction', async () => {
      const mockEm = { save: jest.fn((v) => v) };
      jest.mocked(em as any).transaction.mockImplementationOnce((cb) => cb(mockEm));
      jest.spyOn(service as any, 'generateUserId').mockResolvedValueOnce({ id: 'id' });

      await service.registerWithEmailPassword(body);

      expect(mockEm.save).toHaveBeenNthCalledWith(1, User, expect.objectContaining({ name: body.user.name }));
      expect(mockEm.save).toHaveBeenNthCalledWith(2, UserAuth, expect.objectContaining({ email: body.auth.email }));
    });
  });

  describe('loginWithEmailPassword', () => {
    const body: LoginWithEmailPasswordDto = { email: 'a@a', password: '123' };
    const _userAuth: Omit<Partial<UserAuth>, 'user'> & { user: Partial<User> } = {
      id: 'id',
      hash: body.password,
      user: { name: 'test' },
    };

    it('should throw if not found', async () => {
      jest.mocked(userAuth).findOne.mockResolvedValueOnce(undefined);
      await expect(service.loginWithEmailPassword(body)).rejects.toBeInstanceOf(ForbiddenException);
    });

    it('should throw if wrong password', async () => {
      jest.mocked(userAuth).findOne.mockResolvedValueOnce(_userAuth as UserAuth);
      jest.mocked(bcrypt).hash.mockImplementationOnce((p, s, cb) => Promise.resolve('321'));

      await expect(service.loginWithEmailPassword(body)).rejects.toBeInstanceOf(ForbiddenException);
    });

    it('should return login result', async () => {
      jest.mocked(userAuth).findOne.mockResolvedValueOnce(_userAuth as UserAuth);
      jest.mocked(bcrypt).hash.mockImplementationOnce((p, s, cb) => Promise.resolve(p));
      const loginResult = 'result';
      jest.mocked(auth as any).login.mockReturnValueOnce(loginResult);

      const result = await service.loginWithEmailPassword(body);
      expect(result).toBe(loginResult);
    });
  });
});
