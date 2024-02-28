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
exports.AssignmentsController = void 0;
const create_assignment_dto_1 = require("./dtos/create-assignment.dto");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const assignments_service_1 = require("./assignments.service");
let AssignmentsController = class AssignmentsController {
    constructor(assignmentsService) {
        this.assignmentsService = assignmentsService;
    }
    async getAllAssignments() {
        return await this.assignmentsService.getAllAssignment();
    }
    async getAssignmentsByUserId(id) {
        return await this.assignmentsService.getAssignmentsByUserId(id);
    }
    async getAssignmentsByUserIdByTeacher(id, teacherId) {
        return await this.assignmentsService.getAssignmentsByUserIdByTeacher(id, teacherId);
    }
    getPagingAssignment(filter) {
        return this.assignmentsService.getPagingAssignments(filter);
    }
    getOneAssgnemnt(filter) {
        return this.assignmentsService.getOneAssignment(filter);
    }
    async getAssignmentsOfBook(id, userId) {
        return await this.assignmentsService.getAssignmentsOfBook(id, userId);
    }
    async createMaterial(createAssignmentDto) {
        await this.assignmentsService.deleteAssignment(createAssignmentDto.material, createAssignmentDto.student);
        return this.assignmentsService.createAssignment(createAssignmentDto);
    }
    async getAssignmentByBookId(bookId) {
        return await this.assignmentsService.getAssignmentByBookId(bookId);
    }
    async deleteAssignment(bookid, userid) {
        return await this.assignmentsService.deleteAssignment(bookid, userid);
    }
    async updateAssignment(id, createAssignmentDto) {
        return await this.assignmentsService.updateAssignment(id, createAssignmentDto);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AssignmentsController.prototype, "getAllAssignments", null);
__decorate([
    (0, common_1.Get)('/user/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AssignmentsController.prototype, "getAssignmentsByUserId", null);
__decorate([
    (0, common_1.Get)('/user/:id/teacher/:teacherId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('teacherId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AssignmentsController.prototype, "getAssignmentsByUserIdByTeacher", null);
__decorate([
    (0, common_1.Get)('/paging'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AssignmentsController.prototype, "getPagingAssignment", null);
__decorate([
    (0, common_1.Get)('/one'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AssignmentsController.prototype, "getOneAssgnemnt", null);
__decorate([
    (0, common_1.Get)('/book/:id/:userId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AssignmentsController.prototype, "getAssignmentsOfBook", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiBody)({ type: create_assignment_dto_1.CreateAssignmentDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_assignment_dto_1.CreateAssignmentDto]),
    __metadata("design:returntype", Promise)
], AssignmentsController.prototype, "createMaterial", null);
__decorate([
    (0, common_1.Get)('/:bookId'),
    __param(0, (0, common_1.Param)('bookId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AssignmentsController.prototype, "getAssignmentByBookId", null);
__decorate([
    (0, common_1.Post)('/delete/:bookid/:userid'),
    __param(0, (0, common_1.Param)('bookid')),
    __param(1, (0, common_1.Param)('userid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AssignmentsController.prototype, "deleteAssignment", null);
__decorate([
    (0, common_1.Post)('/update/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_assignment_dto_1.CreateAssignmentDto]),
    __metadata("design:returntype", Promise)
], AssignmentsController.prototype, "updateAssignment", null);
AssignmentsController = __decorate([
    (0, common_1.Controller)('assignments'),
    (0, swagger_1.ApiTags)('Assignments'),
    __metadata("design:paramtypes", [assignments_service_1.AssignmentsService])
], AssignmentsController);
exports.AssignmentsController = AssignmentsController;
//# sourceMappingURL=assignments.controller.js.map