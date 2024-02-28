"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WordsearchModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const wordsearch_service_1 = require("./wordsearch.service");
const wordsearch_schema_1 = require("./schemas/wordsearch.schema");
let WordsearchModule = class WordsearchModule {
};
WordsearchModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: wordsearch_schema_1.Wordsearch.name,
                    schema: wordsearch_schema_1.WordsearchSchema,
                },
            ]),
        ],
        providers: [wordsearch_service_1.WordsearchService],
        exports: [
            wordsearch_service_1.WordsearchService,
            mongoose_1.MongooseModule.forFeature([
                {
                    name: wordsearch_schema_1.Wordsearch.name,
                    schema: wordsearch_schema_1.WordsearchSchema,
                },
            ]),
        ],
    })
], WordsearchModule);
exports.WordsearchModule = WordsearchModule;
//# sourceMappingURL=wordsearch.module.js.map