"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordBooksModule = void 0;
const materials_module_1 = require("./../materials/materials.module");
const record_books_schema_1 = require("./schemas/record-books.schema");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const record_books_service_1 = require("./record-books.service");
const record_books_controller_1 = require("./record-books.controller");
let RecordBooksModule = class RecordBooksModule {
};
RecordBooksModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: record_books_schema_1.RecordBook.name,
                    schema: record_books_schema_1.RecordBookSchema,
                },
            ]),
            (0, common_1.forwardRef)(() => materials_module_1.MaterialsModule),
        ],
        providers: [record_books_service_1.RecordBooksService],
        exports: [record_books_service_1.RecordBooksService],
        controllers: [record_books_controller_1.RecordBooksController],
    })
], RecordBooksModule);
exports.RecordBooksModule = RecordBooksModule;
//# sourceMappingURL=record-books.module.js.map