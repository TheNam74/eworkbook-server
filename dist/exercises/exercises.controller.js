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
exports.ExercisesController = void 0;
const records_service_1 = require("./../records/records.service");
const common_1 = require("@nestjs/common");
const exercises_service_1 = require("./exercises.service");
const materials_service_1 = require("../materials/materials.service");
const swagger_1 = require("@nestjs/swagger");
const create_exercise_dto_1 = require("./dtos/create-exercise.dto");
const create_material_exercises_dto_1 = require("./dtos/create-material-exercises.dto");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const rxjs_1 = require("rxjs");
const decorators_1 = require("../common/decorators");
const at_guard_1 = require("../common/guards/at.guard");
const update_exercise_dto_1 = require("./dtos/update-exercise.dto");
let ExercisesController = class ExercisesController {
    constructor(exercisesService, recordService, materialService) {
        this.exercisesService = exercisesService;
        this.recordService = recordService;
        this.materialService = materialService;
    }
    getExercises(filter) {
        return this.exercisesService.getExercises(filter);
    }
    updateExercise(body) {
        return this.exercisesService.updateExercise(body);
    }
    createExercise(createExerciseDto) {
        return this.exercisesService.createExercise(createExerciseDto);
    }
    handleUpload(file) {
        return { url: file.filename };
    }
    handleUploadAudio(file) {
        return { url: file.filename };
    }
    getImage(filename, res) {
        return (0, rxjs_1.of)(res.sendFile((0, path_1.join)(process.cwd(), `uploads/images/exercises/${filename}`)));
    }
    getAudio(filename, res) {
        return (0, rxjs_1.of)(res.sendFile((0, path_1.join)(process.cwd(), `uploads/audios/exercises/${filename}`)));
    }
    createMaterialExercises(body) {
        return this.exercisesService.createMaterialExercises(body);
    }
    deleteExercise(req, id) {
        return this.exercisesService.deleteExercise(id);
    }
    async receiveStatus(userId, body) {
        try {
            const status = await this.exercisesService.getStatusLesson(body.data.data);
            const getNumberCorrect = (status) => status === null || status === void 0 ? void 0 : status.reduce((acc, curr) => {
                return acc + curr.correct;
            }, 0);
            const getAllNumberCorrect = (status) => status.reduce((acc, curr) => {
                var _a;
                return acc + getNumberCorrect((_a = curr === null || curr === void 0 ? void 0 : curr.content) === null || _a === void 0 ? void 0 : _a.status);
            }, 0);
            const getTotal = (status) => status === null || status === void 0 ? void 0 : status.reduce((acc, curr) => {
                var _a, _b;
                return acc + ((_b = (_a = curr.content) === null || _a === void 0 ? void 0 : _a.status) === null || _b === void 0 ? void 0 : _b.length);
            }, 0);
            const material = await this.materialService.getMaterialById(body.data.materialId);
            const root = await this.materialService.getRootOfThisMaterial(body.data.materialId);
            const record = await this.recordService.createRecord(this.materialService, {
                userId: userId,
                time: new Date(),
                name: material.name,
                parent: material._id,
                root: root._id,
                numberCorrect: getAllNumberCorrect(status),
                totalQuestion: getTotal(status),
                children: [
                    {
                        userAnswer: status,
                        exerciseId: body.data.materialId,
                    },
                ],
            });
            return {
                status,
                recordId: record._id,
            };
        }
        catch (error) {
            return error;
        }
    }
};
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ExercisesController.prototype, "getExercises", null);
__decorate([
    (0, common_1.Post)('update'),
    (0, swagger_1.ApiBody)({ type: update_exercise_dto_1.UpdateExerciseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_exercise_dto_1.UpdateExerciseDto]),
    __metadata("design:returntype", void 0)
], ExercisesController.prototype, "updateExercise", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiBody)({ type: create_exercise_dto_1.CreateExerciseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_exercise_dto_1.CreateExerciseDto]),
    __metadata("design:returntype", Promise)
], ExercisesController.prototype, "createExercise", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)('images'),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                image: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/images/exercises',
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = (0, path_1.extname)(file.originalname);
                const filename = `${uniqueSuffix}${ext}`;
                callback(null, filename);
            },
        }),
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ExercisesController.prototype, "handleUpload", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)('audios'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('audio', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/audios/exercises',
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = (0, path_1.extname)(file.originalname);
                const filename = `${uniqueSuffix}${ext}`;
                callback(null, filename);
            },
        }),
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ExercisesController.prototype, "handleUploadAudio", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)('images/:filename'),
    __param(0, (0, common_1.Param)('filename')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ExercisesController.prototype, "getImage", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)('audios/:filename'),
    __param(0, (0, common_1.Param)('filename')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ExercisesController.prototype, "getAudio", null);
__decorate([
    (0, common_1.Post)('material'),
    (0, swagger_1.ApiBody)({ type: create_material_exercises_dto_1.CreateMaterialExercisesDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_material_exercises_dto_1.CreateMaterialExercisesDto]),
    __metadata("design:returntype", void 0)
], ExercisesController.prototype, "createMaterialExercises", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ExercisesController.prototype, "deleteExercise", null);
__decorate([
    (0, common_1.Post)('status'),
    (0, common_1.UseGuards)(at_guard_1.AtGuard),
    (0, swagger_1.ApiBody)({ type: common_1.All }),
    __param(0, (0, decorators_1.GetCurrentUserId)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ExercisesController.prototype, "receiveStatus", null);
ExercisesController = __decorate([
    (0, common_1.Controller)('exercises'),
    (0, swagger_1.ApiTags)('Exercise'),
    (0, common_1.UseGuards)(at_guard_1.AtGuard),
    __metadata("design:paramtypes", [exercises_service_1.ExercisesService,
        records_service_1.RecordsService,
        materials_service_1.MaterialsService])
], ExercisesController);
exports.ExercisesController = ExercisesController;
//# sourceMappingURL=exercises.controller.js.map