import { Test, TestingModule } from '@nestjs/testing';
import { ExercisesService } from './exercises.service';

describe('ExercisesService', () => {
  let service: ExercisesService;
  // const exercise = {
  //   exerciseType: 'MultipleChoice',
  //   title: "What's your name?",
  //   content: {
  //     exerciseArray: [
  //       {
  //         exerciseText: 'What is your name?',
  //         exerciseImg: 'abc',
  //         answers: [
  //           { text: 'John', img: 'def' },
  //           { text: 'Jane', img: 'ghi' },
  //         ],
  //       },
  //       {
  //         exerciseText: 'What is your favorite color?',
  //         exerciseImg: 'def',
  //         answers: [
  //           { text: 'Red', img: 'red' },
  //           { text: 'Blue', img: 'blue' },
  //         ],
  //       },
  //     ],
  //     correctAnswer: [1, 2],
  //   },
  // };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExercisesService],
    }).compile();

    service = module.get<ExercisesService>(ExercisesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should create a exercise', async () => {
    // const createdExercise = await service.createExercise(exercise);
    // console.log(createdExercise);
  });
});
