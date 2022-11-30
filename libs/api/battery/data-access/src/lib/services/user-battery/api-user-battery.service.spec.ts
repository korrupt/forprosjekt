import { Test, TestingModule } from '@nestjs/testing';
import { ApiUserBatteryService } from './api-user-battery.service';

describe('ApiUserBatteryService', () => {
  let service: ApiUserBatteryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiUserBatteryService],
    }).compile();

    service = module.get<ApiUserBatteryService>(ApiUserBatteryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
