"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsultModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const users_module_1 = require("../users/users.module");
const consult_controller_1 = require("./consult.controller");
const consult_service_1 = require("./consult.service");
const consult_schema_1 = require("./schemas/consult.schema");
let ConsultModule = class ConsultModule {
};
ConsultModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: consult_schema_1.Consult.name,
                    schema: consult_schema_1.ConsultSchema,
                },
            ]),
            users_module_1.UsersModule,
        ],
        providers: [consult_service_1.default],
        exports: [consult_service_1.default],
        controllers: [consult_controller_1.ConsultController],
    })
], ConsultModule);
exports.ConsultModule = ConsultModule;
//# sourceMappingURL=consult.module.js.map