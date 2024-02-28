"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SortModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const sort_service_1 = require("./sort.service");
const sort_schema_1 = require("./schemas/sort.schema");
let SortModule = class SortModule {
};
SortModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: sort_schema_1.Sort.name,
                    schema: sort_schema_1.SortSchema,
                },
            ]),
        ],
        providers: [sort_service_1.SortService],
        exports: [
            sort_service_1.SortService,
            mongoose_1.MongooseModule.forFeature([
                {
                    name: sort_schema_1.Sort.name,
                    schema: sort_schema_1.SortSchema,
                },
            ]),
        ],
    })
], SortModule);
exports.SortModule = SortModule;
//# sourceMappingURL=sort.module.js.map