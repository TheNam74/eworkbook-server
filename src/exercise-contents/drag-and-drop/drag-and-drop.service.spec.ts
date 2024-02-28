import { Test, TestingModule } from '@nestjs/testing';
import { DragAndDropService } from './drag-and-drop.service';

describe('DragAndDropService', () => {
  let service: DragAndDropService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DragAndDropService],
    }).compile();

    service = module.get<DragAndDropService>(DragAndDropService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
