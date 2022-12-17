import { Test, TestingModule } from '@nestjs/testing';
import { ApiMqttService } from './api-mqtt.service';

describe('ApiMqttService', () => {
  let service: ApiMqttService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiMqttService],
    }).compile();

    service = module.get<ApiMqttService>(ApiMqttService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
