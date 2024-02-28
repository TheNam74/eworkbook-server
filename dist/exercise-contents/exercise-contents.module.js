"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExerciseContentsModule = void 0;
const line_word_search_service_1 = require("./line-word-search/line-word-search.service");
const line_word_search_module_1 = require("./line-word-search/line-word-search.module");
const crossword_service_1 = require("./crossword/crossword.service");
const records_module_1 = require("./../records/records.module");
const multiple_choice_module_1 = require("./multiple-choice/multiple-choice.module");
const multiple_choice_service_1 = require("./multiple-choice/multiple-choice.service");
const common_1 = require("@nestjs/common");
const fill_blank_module_1 = require("./fill-blank/fill-blank.module");
const fill_blank_service_1 = require("./fill-blank/fill-blank.service");
const match_module_1 = require("./match/match.module");
const match_service_1 = require("./match/match.service");
const wordsearch_module_1 = require("./wordsearch/wordsearch.module");
const wordsearch_service_1 = require("./wordsearch/wordsearch.service");
const unscramble_module_1 = require("./unscramble/unscramble.module");
const unscramble_service_1 = require("./unscramble/unscramble.service");
const drag_and_drop_module_1 = require("./drag-and-drop/drag-and-drop.module");
const drag_and_drop_service_1 = require("./drag-and-drop/drag-and-drop.service");
const pic_drag_and_drop_module_1 = require("./pic-drag-and-drop/pic-drag-and-drop.module");
const pic_drag_and_drop_service_1 = require("./pic-drag-and-drop/pic-drag-and-drop.service");
const sort_module_1 = require("./sort/sort.module");
const sort_service_1 = require("./sort/sort.service");
const make_sentence_module_1 = require("./make-sentence/make-sentence.module");
const make_sentence_service_1 = require("./make-sentence/make-sentence.service");
const crossword_module_1 = require("./crossword/crossword.module");
const listening_service_1 = require("./listening/listening.service");
const listening_module_1 = require("./listening/listening.module");
let ExerciseContentsModule = class ExerciseContentsModule {
};
ExerciseContentsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            multiple_choice_module_1.MultipleChoiceModule,
            fill_blank_module_1.FillBlankModule,
            match_module_1.MatchModule,
            wordsearch_module_1.WordsearchModule,
            unscramble_module_1.UnscrambleModule,
            drag_and_drop_module_1.DragAndDropModule,
            sort_module_1.SortModule,
            make_sentence_module_1.MakeSentenceModule,
            records_module_1.RecordsModule,
            pic_drag_and_drop_module_1.PicDragAndDropModule,
            crossword_module_1.CrosswordModule,
            line_word_search_module_1.LineWordSearchModule,
            listening_module_1.ListeningModule,
        ],
        providers: [
            multiple_choice_service_1.MultipleChoiceService,
            fill_blank_service_1.FillBlankService,
            match_service_1.MatchService,
            wordsearch_service_1.WordsearchService,
            unscramble_service_1.UnscrambleService,
            drag_and_drop_service_1.DragAndDropService,
            pic_drag_and_drop_service_1.PicDragAndDropService,
            sort_service_1.SortService,
            make_sentence_service_1.MakeSentenceService,
            crossword_service_1.CrosswordService,
            line_word_search_service_1.LineWordSearchService,
            listening_service_1.ListeningService,
        ],
        exports: [
            multiple_choice_service_1.MultipleChoiceService,
            fill_blank_service_1.FillBlankService,
            match_service_1.MatchService,
            wordsearch_service_1.WordsearchService,
            unscramble_service_1.UnscrambleService,
            drag_and_drop_service_1.DragAndDropService,
            pic_drag_and_drop_service_1.PicDragAndDropService,
            sort_service_1.SortService,
            make_sentence_service_1.MakeSentenceService,
            crossword_service_1.CrosswordService,
            line_word_search_service_1.LineWordSearchService,
            listening_service_1.ListeningService,
        ],
    })
], ExerciseContentsModule);
exports.ExerciseContentsModule = ExerciseContentsModule;
//# sourceMappingURL=exercise-contents.module.js.map