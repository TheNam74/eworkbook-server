"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VotingModule = void 0;
const voting_service_1 = require("./voting.service");
const voting_schema_1 = require("./schema/voting.schema");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
let VotingModule = class VotingModule {
};
VotingModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: voting_schema_1.Voting.name,
                    schema: voting_schema_1.VotingSchema,
                },
            ]),
        ],
        providers: [voting_service_1.VotingService],
        exports: [voting_service_1.VotingService],
    })
], VotingModule);
exports.VotingModule = VotingModule;
//# sourceMappingURL=voting.module.js.map