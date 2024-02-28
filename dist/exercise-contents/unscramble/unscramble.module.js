"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnscrambleModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const unscramble_schema_1 = require("./schemas/unscramble.schema");
const unscramble_service_1 = require("./unscramble.service");
let UnscrambleModule = class UnscrambleModule {
};
UnscrambleModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: unscramble_schema_1.Unscramble.name,
                    schema: unscramble_schema_1.UnscrambleSchema,
                },
            ]),
        ],
        providers: [unscramble_service_1.UnscrambleService],
        exports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: unscramble_schema_1.Unscramble.name,
                    schema: unscramble_schema_1.UnscrambleSchema,
                },
            ]),
            unscramble_service_1.UnscrambleService,
        ],
    })
], UnscrambleModule);
exports.UnscrambleModule = UnscrambleModule;
//# sourceMappingURL=unscramble.module.js.map