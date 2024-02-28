"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrosswordModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const crossword_service_1 = require("./crossword.service");
const crossword_schema_1 = require("./schema/crossword.schema");
let CrosswordModule = class CrosswordModule {
};
CrosswordModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: crossword_schema_1.Crossword.name,
                    schema: crossword_schema_1.CrosswordSchema,
                },
            ]),
        ],
        providers: [crossword_service_1.CrosswordService],
        exports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: crossword_schema_1.Crossword.name,
                    schema: crossword_schema_1.CrosswordSchema,
                },
            ]),
            crossword_service_1.CrosswordService,
        ],
    })
], CrosswordModule);
exports.CrosswordModule = CrosswordModule;
//# sourceMappingURL=crossword.module.js.map