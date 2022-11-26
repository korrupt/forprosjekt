import { ApiAuthConfigService } from '@forprosjekt/api/auth/config';
import { JwtPayload } from '@forprosjekt/shared/models';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { ApiAuthService } from './api-auth.service';

import {} from 'jest';

describe('ApiAuthService', () => {
  let service: ApiAuthService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApiAuthService,
        {
          provide: ApiAuthConfigService,
          useValue: {
            EXPIRY: '2h',
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ApiAuthService>(ApiAuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('login should return AccessToken', () => {
    const user: JwtPayload = { userId: '123', email: 'a@a.com' };
    jest.mocked(jwtService).sign.mockReturnValueOnce('token');

    const result = service.login(user);

    expect(jwtService.sign).toHaveBeenCalledWith(user, expect.any(Object));
    expect(result).toEqual(
      expect.objectContaining({
        access_token: 'token',
      }),
    );
  });
});
