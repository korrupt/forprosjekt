import { Test, TestingModule } from '@nestjs/testing';
import { MsMqttBatterySimService } from './ms-mqtt-battery-sim.service';

describe('MsMqttBatterySimService', () => {
  let service: MsMqttBatterySimService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MsMqttBatterySimService],
    }).compile();

    service = module.get<MsMqttBatterySimService>(MsMqttBatterySimService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
