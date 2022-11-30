import { Battery, UserBattery } from '@forprosjekt/api/battery/utils';
import { User } from '@forprosjekt/api/user/utils';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ApiBatteryService } from './api-battery.service';

describe('ApiBatteryService', () => {
  let service: ApiBatteryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApiBatteryService,
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

    service = module.get<ApiBatteryService>(ApiBatteryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
