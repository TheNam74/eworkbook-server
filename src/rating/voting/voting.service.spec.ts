import { VotingService } from './voting.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('VotingService', () => {
  let service: VotingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VotingService],
    }).compile();

    service = module.get<VotingService>(VotingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
