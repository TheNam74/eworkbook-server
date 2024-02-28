"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PairsModule = void 0;
const pairs_schema_1 = require("./schemas/pairs.schema");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const Pairs_service_1 = require("./Pairs.service");
const Pairs_controller_1 = require("./Pairs.controller");
const users_module_1 = require("../users/users.module");
let PairsModule = class PairsModule {
};
PairsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: pairs_schema_1.Pair.name,
                    schema: pairs_schema_1.PairSchema,
                },
            ]),
            users_module_1.UsersModule,
        ],
        providers: [Pairs_service_1.PairsService],
        exports: [Pairs_service_1.PairsService],
        controllers: [Pairs_controller_1.PairsController],
    })
], PairsModule);
exports.PairsModule = PairsModule;
//# sourceMappingURL=pairs.module.js.map