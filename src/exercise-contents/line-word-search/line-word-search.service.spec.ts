import { LineWordSearchService } from './line-word-search.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('LineWordSearchService', () => {
  let service: LineWordSearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LineWordSearchService],
    }).compile();

    service = module.get<LineWordSearchService>(LineWordSearchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
