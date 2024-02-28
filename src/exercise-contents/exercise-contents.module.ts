import { LineWordSearchService } from './line-word-search/line-word-search.service';
import { LineWordSearchModule } from './line-word-search/line-word-search.module';
import { CrosswordService } from './crossword/crossword.service';
import { RecordsModule } from './../records/records.module';
import { MultipleChoiceModule } from './multiple-choice/multiple-choice.module';
import { MultipleChoiceService } from './multiple-choice/multiple-choice.service';
import { Module } from '@nestjs/common';
import { FillBlankModule } from './fill-blank/fill-blank.module';
import { FillBlankService } from './fill-blank/fill-blank.service';
import { MatchModule } from './match/match.module';
import { MatchService } from './match/match.service';
import { WordsearchModule } from './wordsearch/wordsearch.module';
import { WordsearchService } from './wordsearch/wordsearch.service';
import { UnscrambleModule } from './unscramble/unscramble.module';
import { UnscrambleService } from './unscramble/unscramble.service';
import { DragAndDropModule } from './drag-and-drop/drag-and-drop.module';
import { DragAndDropService } from './drag-and-drop/drag-and-drop.service';
import { PicDragAndDropModule } from './pic-drag-and-drop/pic-drag-and-drop.module';
import { PicDragAndDropService } from './pic-drag-and-drop/pic-drag-and-drop.service';
import { SortModule } from './sort/sort.module';
import { SortService } from './sort/sort.service';
import { MakeSentenceModule } from './make-sentence/make-sentence.module';
import { MakeSentenceService } from './make-sentence/make-sentence.service';
import { CrosswordModule } from './crossword/crossword.module';
import { ListeningService } from './listening/listening.service';
import { ListeningModule } from './listening/listening.module';

/* EDIT FOR NEW TOE */
@Module({
  imports: [
    MultipleChoiceModule,
    FillBlankModule,
    MatchModule,
    WordsearchModule,
    UnscrambleModule,
    DragAndDropModule,
    SortModule,
    MakeSentenceModule,
    RecordsModule,
    PicDragAndDropModule,
    CrosswordModule,
    LineWordSearchModule,
    ListeningModule,
  ],
  providers: [
    MultipleChoiceService,
    FillBlankService,
    MatchService,
    WordsearchService,
    UnscrambleService,
    DragAndDropService,
    PicDragAndDropService,
    SortService,
    MakeSentenceService,
    CrosswordService,
    LineWordSearchService,
    ListeningService,
  ],
  exports: [
    MultipleChoiceService,
    FillBlankService,
    MatchService,
    WordsearchService,
    UnscrambleService,
    DragAndDropService,
    PicDragAndDropService,
    SortService,
    MakeSentenceService,
    CrosswordService,
    LineWordSearchService,
    ListeningService,
  ],
})
export class ExerciseContentsModule {}
