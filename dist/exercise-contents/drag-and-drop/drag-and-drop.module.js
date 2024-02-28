"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DragAndDropModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const drag_and_drop_schema_1 = require("./schemas/drag-and-drop.schema");
const drag_and_drop_service_1 = require("./drag-and-drop.service");
let DragAndDropModule = class DragAndDropModule {
};
DragAndDropModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: drag_and_drop_schema_1.DragAndDrop.name,
                    schema: drag_and_drop_schema_1.DragAndDropSchema,
                },
            ]),
        ],
        providers: [drag_and_drop_service_1.DragAndDropService],
        exports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: drag_and_drop_schema_1.DragAndDrop.name,
                    schema: drag_and_drop_schema_1.DragAndDropSchema,
                },
            ]),
            drag_and_drop_service_1.DragAndDropService,
        ],
    })
], DragAndDropModule);
exports.DragAndDropModule = DragAndDropModule;
//# sourceMappingURL=drag-and-drop.module.js.map