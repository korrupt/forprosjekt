import { Test, TestingModule } from '@nestjs/testing';
import { ApiBatteryService } from './api-battery.service';

describe('ApiBatteryService', () => {
  let service: ApiBatteryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiBatteryService],
    }).compile();

    service = module.get<ApiBatteryService>(ApiBatteryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
