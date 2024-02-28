import { Test, TestingModule } from '@nestjs/testing';
import { FillBlankService } from './fill-blank.service';

describe('FillBlankService', () => {
  let service: FillBlankService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FillBlankService],
    }).compile();

    service = module.get<FillBlankService>(FillBlankService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
