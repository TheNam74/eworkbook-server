"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const ratings_module_1 = require("./rating/ratings.module");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
const exercises_module_1 = require("./exercises/exercises.module");
const exercise_contents_module_1 = require("./exercise-contents/exercise-contents.module");
const materials_module_1 = require("./materials/materials.module");
const users_module_1 = require("./users/users.module");
const auth_module_1 = require("./auth/auth.module");
const app_controller_1 = require("./app.controller");
const records_module_1 = require("./records/records.module");
const assignments_module_1 = require("./assignment/assignments.module");
const logger_middleware_1 = require("./utils/logger.middleware");
const consult_module_1 = require("./consults/consult.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(logger_middleware_1.LoggerMiddleware).forRoutes('*');
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            mongoose_1.MongooseModule.forRoot(process.env.MONGO_URI),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            exercises_module_1.ExercisesModule,
            exercise_contents_module_1.ExerciseContentsModule,
            materials_module_1.MaterialsModule,
            records_module_1.RecordsModule,
            assignments_module_1.AssignmentsModule,
            ratings_module_1.RatingsModule,
            consult_module_1.ConsultModule,
        ],
        providers: [],
        controllers: [app_controller_1.AppController],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map