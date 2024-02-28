"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const reset_password_dto_1 = require("./dtos/reset-password.dto");
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const path_1 = require("path");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const users_service_1 = require("./users.service");
const swagger_1 = require("@nestjs/swagger");
const create_user_dto_1 = require("./dtos/create-user.dto");
const update_password_dto_1 = require("./dtos/update-password.dto");
const check_random_string_dto_1 = require("./dtos/check-random-string.dto");
const guards_1 = require("../common/guards");
const decorators_1 = require("../common/decorators");
let UsersController = class UsersController {
    constructor(userService) {
        this.userService = userService;
    }
    updateUser(user) {
        return this.userService.updateUser(user);
    }
    updatePassword(passwords, userId) {
        return this.userService.updatePassword(passwords, userId);
    }
    getImage(filename, res) {
        return (0, rxjs_1.of)(res.sendFile((0, path_1.join)(process.cwd(), `./uploads/images/avatars/${filename}`)));
    }
    resetForgottenPassword(resetPassword) {
        return this.userService.resetForgottenPassword(resetPassword.email, resetPassword.randomString, resetPassword.newPassword);
    }
    async sendMail(req) {
        const rawHeaders = req.rawHeaders;
        const clientSide = rawHeaders[rawHeaders.indexOf('Referer') + 1];
        const filter = req.query;
        if (filter === 'undefined') {
            return false;
        }
        return await this.userService.sentMail(filter, clientSide);
    }
    async resetPassword(checkRandomStringBody) {
        if (checkRandomStringBody === null) {
            return false;
        }
        const userFindedByEmail = await this.userService.findOne(checkRandomStringBody.email);
        if (userFindedByEmail === null)
            return false;
        return (userFindedByEmail.randomString === checkRandomStringBody.randomString);
    }
    handleUpload(file, userId) {
        return this.userService.updateAvatar(file.filename, userId);
    }
    getSimilarEmail(email) {
        return this.userService.getSimilarEmail(email);
    }
    getUser(id) {
        return this.userService.getUser(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiBody)({ type: create_user_dto_1.CreateUserDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "updateUser", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.AtGuard),
    (0, common_1.Post)('/updatePassword'),
    (0, swagger_1.ApiBody)({ type: update_password_dto_1.UpdatePasswordDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_1.GetCurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_password_dto_1.UpdatePasswordDto, String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "updatePassword", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)('images/:filename'),
    __param(0, (0, common_1.Param)('filename')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getImage", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)('resetForgottenPassword'),
    (0, swagger_1.ApiBody)({ type: reset_password_dto_1.ResetPasswordDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reset_password_dto_1.ResetPasswordDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "resetForgottenPassword", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)('sendmail'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "sendMail", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)('checkRandomString'),
    (0, swagger_1.ApiBody)({ type: check_random_string_dto_1.CheckRandomString }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [check_random_string_dto_1.CheckRandomString]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.Post)('images'),
    (0, common_1.UseGuards)(guards_1.AtGuard),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                avatar: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('avatar', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/images/avatars',
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = (0, path_1.extname)(file.originalname);
                const filename = `${uniqueSuffix}${ext}`;
                callback(null, filename);
            },
        }),
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, decorators_1.GetCurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "handleUpload", null);
__decorate([
    (0, common_1.Get)('/similarEmail/:email'),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getSimilarEmail", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getUser", null);
UsersController = __decorate([
    (0, swagger_1.ApiTags)('User'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map