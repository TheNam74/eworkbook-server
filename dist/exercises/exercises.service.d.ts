import { LineWordSearchService } from './../exercise-contents/line-word-search/line-word-search.service';
import { CreateExerciseDto } from './dtos/create-exercise.dto';
import { Model } from 'mongoose';
import { FillBlankService } from '../exercise-contents/fill-blank/fill-blank.service';
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
export declare class ExerciseServiceFactory {
    private readonly multipleChoiceService;
    private readonly fillBlankService;
    private readonly matchService;
    private readonly wordsearchService;
    private readonly unscrambleService;
    private readonly dragAndDropService;
    private readonly picDragAndDropService;
    private readonly sortService;
    private readonly makeSentenceService;
    private readonly crosswordService;
    private readonly lineWordSearchService;
    private readonly listeningService;
    constructor(multipleChoiceService: MultipleChoiceService, fillBlankService: FillBlankService, matchService: MatchService, wordsearchService: WordsearchService, unscrambleService: UnscrambleService, dragAndDropService: DragAndDropService, picDragAndDropService: PicDragAndDropService, sortService: SortService, makeSentenceService: MakeSentenceService, crosswordService: CrosswordService, lineWordSearchService: LineWordSearchService, listeningService: ListeningService);
    getService(type: string): any;
}
export declare class ExercisesService {
    private readonly exerciseModel;
    private readonly exerciseServiceFactory;
    private readonly recordService;
    constructor(exerciseModel: Model<ExerciseDocument>, exerciseServiceFactory: ExerciseServiceFactory, recordService: RecordsService);
    createExercise(exercise: CreateExerciseDto): Promise<Exercise>;
    createMaterialExercises(body: CreateMaterialExercisesDto): void;
    getExercises(filter: any): Promise<any>;
    getExerciseNoPopulate(filter: any): Promise<any>;
    updateExercise(updatedExercise: UpdateExerciseDto): Promise<Exercise>;
    deleteExercise(id: string): Promise<any>;
    deleteMaterialExercises(parentMaterial: string): Promise<any>;
    getCorrectAnswers(id: string): Promise<any>;
    getStatusLesson(assignment: any): Promise<any>;
}
