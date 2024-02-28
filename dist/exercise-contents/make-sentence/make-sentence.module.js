"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MakeSentenceModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const make_sentence_service_1 = require("./make-sentence.service");
const make_sentence_schema_1 = require("./schemas/make-sentence.schema");
let MakeSentenceModule = class MakeSentenceModule {
};
MakeSentenceModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: make_sentence_schema_1.MakeSentence.name,
                    schema: make_sentence_schema_1.MakeSentenceSchema,
                },
            ]),
        ],
        providers: [make_sentence_service_1.MakeSentenceService],
        exports: [
            make_sentence_service_1.MakeSentenceService,
            mongoose_1.MongooseModule.forFeature([
                {
                    name: make_sentence_schema_1.MakeSentence.name,
                    schema: make_sentence_schema_1.MakeSentenceSchema,
                },
            ]),
        ],
    })
], MakeSentenceModule);
exports.MakeSentenceModule = MakeSentenceModule;
//# sourceMappingURL=make-sentence.module.js.map