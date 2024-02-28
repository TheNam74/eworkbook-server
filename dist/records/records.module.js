"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordsModule = void 0;
const assignments_module_1 = require("./../assignment/assignments.module");
const record_books_module_1 = require("../record-books/record-books.module");
const records_schema_1 = require("./schemas/records.schema");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const records_service_1 = require("./records.service");
const records_controller_1 = require("./records.controller");
const users_module_1 = require("../users/users.module");
let RecordsModule = class RecordsModule {
};
RecordsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: records_schema_1.Record.name,
                    schema: records_schema_1.RecordSchema,
                },
            ]),
            record_books_module_1.RecordBooksModule,
            assignments_module_1.AssignmentsModule,
            users_module_1.UsersModule
        ],
        providers: [records_service_1.RecordsService],
        exports: [records_service_1.RecordsService],
        controllers: [records_controller_1.RecordsController],
    })
], RecordsModule);
exports.RecordsModule = RecordsModule;
//# sourceMappingURL=records.module.js.map