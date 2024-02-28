"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FillBlankModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const fill_blank_schema_1 = require("./schemas/fill-blank.schema");
const fill_blank_service_1 = require("./fill-blank.service");
let FillBlankModule = class FillBlankModule {
};
FillBlankModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: fill_blank_schema_1.FillBlank.name,
                    schema: fill_blank_schema_1.FillBlankSchema,
                },
            ]),
        ],
        providers: [fill_blank_service_1.FillBlankService],
        exports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: fill_blank_schema_1.FillBlank.name,
                    schema: fill_blank_schema_1.FillBlankSchema,
                },
            ]),
            fill_blank_service_1.FillBlankService,
        ],
    })
], FillBlankModule);
exports.FillBlankModule = FillBlankModule;
//# sourceMappingURL=fill-blank.module.js.map