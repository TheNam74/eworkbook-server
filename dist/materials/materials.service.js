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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterialsService = void 0;
const exercises_service_1 = require("./../exercises/exercises.service");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const material_schema_1 = require("./schemas/material.schema");
const record_books_service_1 = require("../record-books/record-books.service");
let MaterialsService = class MaterialsService {
    constructor(materialModel, exercisesService, recordBooksService) {
        this.materialModel = materialModel;
        this.exercisesService = exercisesService;
        this.recordBooksService = recordBooksService;
    }
    async fakeData(materials) {
        materials.forEach(async (material) => {
            return await this.materialModel.create(material);
        });
    }
    async getDemoMaterialId() {
        const material = await this.materialModel.findOne({
            name: 'eWorkbook Demo',
        });
        return material._id;
    }
    async createMaterial(material) {
        console.log('createMaterialDto from service', material);
        const newMaterial = new this.materialModel(material);
        await newMaterial.save();
        return newMaterial;
    }
    async updateMaterial(id, material) {
        const updatedMaterial = await this.materialModel.findByIdAndUpdate(id, material);
        return updatedMaterial;
    }
    async deleteMaterial(id) {
        const child = await this.materialModel.findOne({ parent: id });
        if (child) {
            return {
                error: 'hasChild',
            };
        }
        await this.exercisesService.deleteMaterialExercises(id);
        await this.materialModel.deleteOne({ _id: id });
        return { success: 'success' };
    }
    async getPagingMaterials(filter) {
        if (filter.isPublicForOtherTeacher === 'true') {
            const skip = filter.pageSize * filter.current - filter.pageSize;
            const limit = filter.pageSize;
            if (filter.ratingStarAverage) {
                filter.ratingStarAverage = {
                    $gte: +filter.ratingStarAverage,
                    $lt: +filter.ratingStarAverage + 1,
                };
            }
            if (filter.name)
                filter.name = new RegExp(filter.name, 'i');
            filter.$or = [
                { isPublicForOtherTeacher: true },
                { author: filter.author },
            ];
            delete filter.isPublicForOtherTeacher;
            delete filter.author;
            const data = await this.materialModel
                .find(filter)
                .sort(filter.sortBy || 'timeCreate')
                .skip(skip)
                .limit(limit)
                .populate('author');
            const total = await this.materialModel.countDocuments(filter);
            return { data, total };
        }
        else {
            const skip = filter.pageSize * filter.current - filter.pageSize;
            const limit = filter.pageSize;
            if (filter.ratingStarAverage) {
                filter.ratingStarAverage = {
                    $gte: +filter.ratingStarAverage,
                    $lt: +filter.ratingStarAverage + 1,
                };
            }
            if (filter.name)
                filter.name = new RegExp(filter.name, 'i');
            const data = await this.materialModel
                .find(filter)
                .sort(filter.sortBy || 'timeCreate')
                .skip(skip)
                .limit(limit)
                .populate('author');
            for (const material of data) {
                const totalStudent = await this.recordBooksService.getTotalStudents(material._id);
                material.totalStudents = totalStudent;
            }
            const total = await this.materialModel.countDocuments(filter);
            return { data, total };
        }
    }
    async getPagingMaterialsWithExercises(filter) {
        const skip = filter.pageSize * filter.current - filter.pageSize;
        const limit = filter.pageSize;
        if (filter.ratingStarAverage) {
            filter.ratingStarAverage = {
                $gte: +filter.ratingStarAverage,
                $lt: +filter.ratingStarAverage + 1,
            };
        }
        if (filter.name)
            filter.name = new RegExp(filter.name, 'i');
        const data = await this.materialModel
            .find(filter)
            .sort(filter.sortBy || 'name')
            .skip(skip)
            .limit(limit)
            .populate('exercises');
        const total = await this.materialModel.countDocuments(filter);
        return { data, total };
    }
    async getFieldValues() {
        let levels = await this.materialModel.aggregate([
            { $match: { depthLevel: 1, status: 'public' } },
            {
                $group: {
                    _id: '$CEFR',
                    count: { $sum: 1 },
                },
            },
            { $sort: { count: -1 } },
            { $limit: 5 },
        ]);
        levels = levels.map((value) => value._id);
        let types = await this.materialModel.aggregate([
            { $match: { depthLevel: 1, status: 'public' } },
            {
                $group: {
                    _id: '$type',
                    count: { $sum: 1 },
                },
            },
            { $sort: { count: -1 } },
            { $limit: 5 },
        ]);
        types = types.map((value) => value._id);
        return { levels, types };
    }
    async getMaterials(filter) {
        let { name } = filter, criteria = __rest(filter, ["name"]);
        if (name == undefined)
            name = '';
        filter = Object.assign(Object.assign({}, criteria), { name: { $regex: name, $options: 'i' } });
        const materials = await this.materialModel.find(filter);
        return materials;
    }
    async getMaterialById(id) {
        try {
            return await this.materialModel.findOne({ _id: id });
        }
        catch (error) {
            throw new common_1.NotFoundException('Material not found');
        }
    }
    async getMaterial(id) {
        try {
            const Allmaterials = await this.materialModel.find();
            const Allexercises = await this.exercisesService.getExerciseNoPopulate({});
            const material = await this.materialModel.findOne({ _id: id });
            material.children = [];
            if (Allmaterials === null) {
                throw new common_1.NotFoundException('Material not found');
            }
            material.children = await this.getAllChildOfThis(Allexercises, Allmaterials, material);
            material.exercises = this.getAllExerciseOfThis(Allexercises, material);
            return material;
        }
        catch (error) {
            throw new common_1.NotFoundException('Material not found');
        }
    }
    async getRootOfThisMaterial(id) {
        let material = await this.materialModel.findOne({ _id: id });
        while (material.parent) {
            material = await this.materialModel.findOne({ _id: material.parent });
        }
        return material;
    }
    getAllChildOfThis(Allexercises, Allmaterials, material) {
        material.exercises = this.getAllExerciseOfThis(Allexercises, material);
        const children = new Array();
        Allmaterials.forEach((mat) => {
            var _a;
            if (((_a = mat.parent) === null || _a === void 0 ? void 0 : _a.toString()) === material._id.toString()) {
                mat.children = this.getAllChildOfThis(Allexercises, Allmaterials, mat);
                mat.exercises = this.getAllExerciseOfThis(Allexercises, mat);
                children.push(mat);
            }
        });
        return children;
    }
    getAllExerciseOfThis(Allexercises, material) {
        const exercises = new Array();
        Allexercises.forEach((ex) => {
            var _a;
            if (((_a = ex.parentMaterial) === null || _a === void 0 ? void 0 : _a.toString()) === material._id.toString()) {
                exercises.push(ex);
            }
        });
        return exercises;
    }
    async increaseRatingCount(id) {
        return await this.materialModel.findOneAndUpdate({ _id: id }, { $inc: { ratingCount: 1 } });
    }
    async updateRatingStartAverage(id, averageStar) {
        return await this.materialModel.findOneAndUpdate({ _id: id }, { ratingStarAverage: averageStar });
    }
    async getRatingCount(id) {
        const returnMaterial = await this.materialModel.findById(id);
        return returnMaterial.ratingCount;
    }
    async getRatingStarAverage(id) {
        const returnMaterial = await this.materialModel.findById(id);
        return returnMaterial.ratingStarAverage;
    }
    async setAuthor(materialId, authorId) {
        const material = await this.getMaterial(materialId);
        await this.materialModel.findOneAndUpdate({ _id: materialId }, {
            author: authorId,
            status: 'public',
        });
        material.children.forEach((material) => {
            this.setAuthor(material._id, authorId);
        });
        return material;
    }
    countLeafsOfThis(material) {
        let count = 0;
        material.children.forEach((child) => {
            if (child.children.length === 0) {
                count++;
            }
            else {
                count += this.countLeafsOfThis(child);
            }
        });
        return count;
    }
    async getNextMaterial(infor) {
        try {
            const { current } = infor;
            let currentMaterial = await this.materialModel.findOne({ _id: current });
            let result = null;
            do {
                const materialWithSameParent = await this.getMaterial(currentMaterial.parent);
                const index = materialWithSameParent.children.findIndex((material) => material._id.toString() === currentMaterial._id.toString());
                if (index < materialWithSameParent.children.length - 1) {
                    result = materialWithSameParent.children[index + 1];
                    currentMaterial = result;
                    if (result.exercises.length !== 0)
                        break;
                    else {
                        result = result.children[0];
                    }
                }
                else {
                    currentMaterial = materialWithSameParent;
                    result = currentMaterial;
                }
            } while (result.exercises.length === 0);
            return result;
        }
        catch (error) {
            console.log(error);
            throw new common_1.NotFoundException('No next material');
        }
    }
    async getHighlyRatedMaterials() {
        const materials = await this.materialModel
            .find({ status: 'public', depthLevel: 1 })
            .sort({ ratingStarAverage: -1 })
            .limit(10)
            .populate('author', ['firstName', 'lastName']);
        return materials;
    }
    async getTopStudentsMaterials() {
        const materialsId = await this.recordBooksService.getTopStudentsMaterialId();
        const materials = await this.materialModel
            .find({
            _id: { $in: materialsId },
        })
            .populate('author', ['firstName', 'lastName']);
        return materials;
    }
};
MaterialsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(material_schema_1.Material.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        exercises_service_1.ExercisesService,
        record_books_service_1.RecordBooksService])
], MaterialsService);
exports.MaterialsService = MaterialsService;
//# sourceMappingURL=materials.service.js.map