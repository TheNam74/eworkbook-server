import { LineWordSearchService } from './../exercise-contents/line-word-search/line-word-search.service';
import { CreateExerciseDto } from './dtos/create-exercise.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// eslint-disable-next-line max-len
import { FillBlankService } from '../exercise-contents/fill-blank/fill-blank.service';
// eslint-disable-next-line max-len
import { MultipleChoiceService } from '../exercise-contents/multiple-choice/multiple-choice.service';
import { MatchService } from './../exercise-contents/match/match.service';
import { DragAndDropService } from '../exercise-contents/drag-and-drop/drag-and-drop.service';
import { PicDragAndDropService } from 'src/exercise-contents/pic-drag-and-drop/pic-drag-and-drop.service';
import { Exercise, ExerciseDocument } from './schemas/exercise.schema';
import { CreateMaterialExercisesDto } from './dtos/create-material-exercises.dto';
import { RecordsService } from '../records/records.service';
import { UpdateExerciseDto } from './dtos/update-exercise.dto';
import { WordsearchService } from 'src/exercise-contents/wordsearch/wordsearch.service';
import { UnscrambleService } from 'src/exercise-contents/unscramble/unscramble.service';
import { SortService } from 'src/exercise-contents/sort/sort.service';
import { MakeSentenceService } from 'src/exercise-contents/make-sentence/make-sentence.service';
import { CrosswordService } from 'src/exercise-contents/crossword/crossword.service';
import { ListeningService } from 'src/exercise-contents/listening/listening.service';

/* EDIT FOR NEW TOE */
@Injectable()
export class ExerciseServiceFactory {
  constructor(
    private readonly multipleChoiceService: MultipleChoiceService,
    private readonly fillBlankService: FillBlankService,
    private readonly matchService: MatchService,
    private readonly wordsearchService: WordsearchService,
    private readonly unscrambleService: UnscrambleService,
    private readonly dragAndDropService: DragAndDropService,
    private readonly picDragAndDropService: PicDragAndDropService,
    private readonly sortService: SortService,
    private readonly makeSentenceService: MakeSentenceService,
    private readonly crosswordService: CrosswordService,
    private readonly lineWordSearchService: LineWordSearchService,
    private readonly listeningService: ListeningService,
  ) {}

  getService(type: string): any {
    switch (type) {
      case 'MultipleChoice':
        return this.multipleChoiceService;
      case 'FillBlank':
        return this.fillBlankService;
      case 'Match':
        return this.matchService;
      case 'Wordsearch':
        return this.wordsearchService;
      case 'Unscramble':
        return this.unscrambleService;
      case 'DragAndDrop':
        return this.dragAndDropService;
      case 'PicDragAndDrop':
        return this.picDragAndDropService;
      case 'Sort':
        return this.sortService;
      case 'MakeSentence':
        return this.makeSentenceService;
      case 'Crossword':
        return this.crosswordService;
      case 'LineWordSearch':
        return this.lineWordSearchService;
      case 'Listening':
        return this.listeningService;
      default:
        throw new Error('Exercise type not found');
    }
  }
}
@Injectable()
export class ExercisesService {
  constructor(
    @InjectModel(Exercise.name)
    private readonly exerciseModel: Model<ExerciseDocument>,
    private readonly exerciseServiceFactory: ExerciseServiceFactory,
    private readonly recordService: RecordsService,
  ) {}
  async createExercise(exercise: CreateExerciseDto): Promise<Exercise> {
    try {
      console.log('this is newExercise 1,', exercise);
      const newExercise = new this.exerciseModel(exercise);
      const newExerciseContent = await this.exerciseServiceFactory
        .getService(exercise.exerciseType)
        .createContent(exercise.content);

      newExercise.content = newExerciseContent._id;
      console.log('this is newExercise,', newExercise);
      await newExercise.save();
      return newExercise;
    } catch (error) {
      throw new Error(error);
    }
  }
  createMaterialExercises(body: CreateMaterialExercisesDto) {
    for (const exercise of body.createExerciseDtos) {
      this.createExercise(exercise);
    }
  }

  async getExercises(filter): Promise<any> {
    return await this.exerciseModel
      .find(filter)
      .populate('content')
      .populate('parentMaterial', 'type');
  }
  async getExerciseNoPopulate(filter): Promise<any> {
    return await this.exerciseModel.find(filter);
  }

  async updateExercise(updatedExercise: UpdateExerciseDto): Promise<Exercise> {
    const id = updatedExercise._id;
    const content = updatedExercise.content;
    delete updatedExercise._id;
    delete updatedExercise.content;
    const dbExercise = await this.exerciseModel.findByIdAndUpdate(
      id,
      updatedExercise,
    );
    const contentId = dbExercise.content.toString();
    await this.exerciseServiceFactory
      .getService(updatedExercise.exerciseType)
      .updateContent(contentId, content);
    return dbExercise;
  }

  async deleteExercise(id: string): Promise<any> {
    const exercise = await this.exerciseModel.findById(id);
    if (exercise) {
      await this.exerciseServiceFactory
        .getService(exercise.exerciseType)
        .deleteContent(exercise.content);
      return await this.exerciseModel.findByIdAndDelete(id);
    }
    throw NotFoundException;
  }

  async deleteMaterialExercises(parentMaterial: string): Promise<any> {
    const exercises = await this.exerciseModel.find({ parentMaterial });
    if (exercises.length > 0) {
      for (const exercise of exercises) {
        await this.exerciseServiceFactory
          .getService(exercise.exerciseType)
          .deleteContent(exercise.content);
      }
    }
    await this.exerciseModel.deleteMany({ parentMaterial });
  }

  async getCorrectAnswers(id: string): Promise<any> {
    return await this.exerciseModel
      .findById(id)
      .populate('content', 'correctAnswer');
  }
  async getStatusLesson(assignment: any): Promise<any> {
    try {
      const status = [];
      assignment.forEach(async (exercise) => {
        status.push(
          this.exerciseServiceFactory
            .getService(exercise.exerciseType)
            .getStatus(exercise),
        );
      });
      return await Promise.all(status).then((res) =>
        assignment.map((item) => {
          const { detail, status } =
            res.find(({ exerciseId }) => exerciseId === item._id) || {};
          return { ...item, content: { detail, status } };
        }),
      );
    } catch (error) {
      console.log(error);
    }
  }
}
