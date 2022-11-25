import { Test, TestingModule } from '@nestjs/testing';
import { ApiUserAuthService } from './user-auth.service';

describe('ApiUserAuthService', () => {
  let service: ApiUserAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiUserAuthService],
    }).compile();

    service = module.get<ApiUserAuthService>(ApiUserAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
