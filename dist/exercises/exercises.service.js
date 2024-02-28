"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExercisesService = exports.ExerciseServiceFactory = void 0;
const line_word_search_service_1 = require("./../exercise-contents/line-word-search/line-word-search.service");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const fill_blank_service_1 = require("../exercise-contents/fill-blank/fill-blank.service");
const multiple_choice_service_1 = require("../exercise-contents/multiple-choice/multiple-choice.service");
const match_service_1 = require("./../exercise-contents/match/match.service");
const drag_and_drop_service_1 = require("../exercise-contents/drag-and-drop/drag-and-drop.service");
const pic_drag_and_drop_service_1 = require("../exercise-contents/pic-drag-and-drop/pic-drag-and-drop.service");
const exercise_schema_1 = require("./schemas/exercise.schema");
const records_service_1 = require("../records/records.service");
const wordsearch_service_1 = require("../exercise-contents/wordsearch/wordsearch.service");
const unscramble_service_1 = require("../exercise-contents/unscramble/unscramble.service");
const sort_service_1 = require("../exercise-contents/sort/sort.service");
const make_sentence_service_1 = require("../exercise-contents/make-sentence/make-sentence.service");
const crossword_service_1 = require("../exercise-contents/crossword/crossword.service");
const listening_service_1 = require("../exercise-contents/listening/listening.service");
let ExerciseServiceFactory = class ExerciseServiceFactory {
    constructor(multipleChoiceService, fillBlankService, matchService, wordsearchService, unscrambleService, dragAndDropService, picDragAndDropService, sortService, makeSentenceService, crosswordService, lineWordSearchService, listeningService) {
        this.multipleChoiceService = multipleChoiceService;
        this.fillBlankService = fillBlankService;
        this.matchService = matchService;
        this.wordsearchService = wordsearchService;
        this.unscrambleService = unscrambleService;
        this.dragAndDropService = dragAndDropService;
        this.picDragAndDropService = picDragAndDropService;
        this.sortService = sortService;
        this.makeSentenceService = makeSentenceService;
        this.crosswordService = crosswordService;
        this.lineWordSearchService = lineWordSearchService;
        this.listeningService = listeningService;
    }
    getService(type) {
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
};
ExerciseServiceFactory = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [multiple_choice_service_1.MultipleChoiceService,
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
        listening_service_1.ListeningService])
], ExerciseServiceFactory);
exports.ExerciseServiceFactory = ExerciseServiceFactory;
let ExercisesService = class ExercisesService {
    constructor(exerciseModel, exerciseServiceFactory, recordService) {
        this.exerciseModel = exerciseModel;
        this.exerciseServiceFactory = exerciseServiceFactory;
        this.recordService = recordService;
    }
    async createExercise(exercise) {
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
        }
        catch (error) {
            throw new Error(error);
        }
    }
    createMaterialExercises(body) {
        for (const exercise of body.createExerciseDtos) {
            this.createExercise(exercise);
        }
    }
    async getExercises(filter) {
        return await this.exerciseModel
            .find(filter)
            .populate('content')
            .populate('parentMaterial', 'type');
    }
    async getExerciseNoPopulate(filter) {
        return await this.exerciseModel.find(filter);
    }
    async updateExercise(updatedExercise) {
        const id = updatedExercise._id;
        const content = updatedExercise.content;
        delete updatedExercise._id;
        delete updatedExercise.content;
        const dbExercise = await this.exerciseModel.findByIdAndUpdate(id, updatedExercise);
        const contentId = dbExercise.content.toString();
        await this.exerciseServiceFactory
            .getService(updatedExercise.exerciseType)
            .updateContent(contentId, content);
        return dbExercise;
    }
    async deleteExercise(id) {
        const exercise = await this.exerciseModel.findById(id);
        if (exercise) {
            await this.exerciseServiceFactory
                .getService(exercise.exerciseType)
                .deleteContent(exercise.content);
            return await this.exerciseModel.findByIdAndDelete(id);
        }
        throw common_1.NotFoundException;
    }
    async deleteMaterialExercises(parentMaterial) {
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
    async getCorrectAnswers(id) {
        return await this.exerciseModel
            .findById(id)
            .populate('content', 'correctAnswer');
    }
    async getStatusLesson(assignment) {
        try {
            const status = [];
            assignment.forEach(async (exercise) => {
                status.push(this.exerciseServiceFactory
                    .getService(exercise.exerciseType)
                    .getStatus(exercise));
            });
            return await Promise.all(status).then((res) => assignment.map((item) => {
                const { detail, status } = res.find(({ exerciseId }) => exerciseId === item._id) || {};
                return Object.assign(Object.assign({}, item), { content: { detail, status } });
            }));
        }
        catch (error) {
            console.log(error);
        }
    }
};
ExercisesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(exercise_schema_1.Exercise.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        ExerciseServiceFactory,
        records_service_1.RecordsService])
], ExercisesService);
exports.ExercisesService = ExercisesService;
//# sourceMappingURL=exercises.service.js.map