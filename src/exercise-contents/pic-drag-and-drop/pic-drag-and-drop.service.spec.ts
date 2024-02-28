import { Test, TestingModule } from '@nestjs/testing';
import { PicDragAndDropService } from './pic-drag-and-drop.service';

describe('PicDragAndDropService', () => {
  let service: PicDragAndDropService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PicDragAndDropService],
    }).compile();

    service = module.get<PicDragAndDropService>(PicDragAndDropService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
