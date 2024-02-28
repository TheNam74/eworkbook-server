"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PicDragAndDropModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const pic_drag_and_drop_schema_1 = require("./schemas/pic-drag-and-drop.schema");
const pic_drag_and_drop_service_1 = require("./pic-drag-and-drop.service");
let PicDragAndDropModule = class PicDragAndDropModule {
};
PicDragAndDropModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: pic_drag_and_drop_schema_1.PicDragAndDrop.name,
                    schema: pic_drag_and_drop_schema_1.PicDragAndDropSchema,
                },
            ]),
        ],
        providers: [pic_drag_and_drop_service_1.PicDragAndDropService],
        exports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: pic_drag_and_drop_schema_1.PicDragAndDrop.name,
                    schema: pic_drag_and_drop_schema_1.PicDragAndDropSchema,
                },
            ]),
            pic_drag_and_drop_service_1.PicDragAndDropService,
        ],
    })
], PicDragAndDropModule);
exports.PicDragAndDropModule = PicDragAndDropModule;
//# sourceMappingURL=pic-drag-and-drop.module.js.map