"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineWordSearchModule = void 0;
const line_word_search_service_1 = require("./line-word-search.service");
const line_word_search_schema_1 = require("./schemas/line-word-search.schema");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
let LineWordSearchModule = class LineWordSearchModule {
};
LineWordSearchModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: line_word_search_schema_1.LineWordSearch.name,
                    schema: line_word_search_schema_1.LineWordSearchSchema,
                },
            ]),
        ],
        providers: [line_word_search_service_1.LineWordSearchService],
        exports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: line_word_search_schema_1.LineWordSearch.name,
                    schema: line_word_search_schema_1.LineWordSearchSchema,
                },
            ]),
            line_word_search_service_1.LineWordSearchService,
        ],
    })
], LineWordSearchModule);
exports.LineWordSearchModule = LineWordSearchModule;
//# sourceMappingURL=line-word-search.module.js.map