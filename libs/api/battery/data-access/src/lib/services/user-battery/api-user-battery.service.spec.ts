import { Battery, UserBattery } from '@forprosjekt/api/battery/utils';
import { User } from '@forprosjekt/api/user/utils';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ApiUserBatteryService } from './api-user-battery.service';

describe('ApiUserBatteryService', () => {
  let service: ApiUserBatteryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApiUserBatteryService,
        {
          provide: getRepositoryToken(Battery),
          useValue: {},
        },
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
        {
          provide: getRepositoryToken(UserBattery),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<ApiUserBatteryService>(ApiUserBatteryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
