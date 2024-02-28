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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const auth_service_1 = require("./auth/auth.service");
const users_service_1 = require("./users/users.service");
const swagger_1 = require("@nestjs/swagger");
const get_current_user_id_decorator_1 = require("./common/decorators/get-current-user-id.decorator");
const guards_1 = require("./common/guards");
let AppController = class AppController {
    constructor(authService, userService) {
        this.authService = authService;
        this.userService = userService;
    }
    getCurrentUser(userId) {
        return this.userService.getUser(userId);
    }
    getHello() {
        return 'Hello World!';
    }
    async register(body, res) {
        const { email, role, firstName, lastName } = body;
        let { password } = body;
        password = await bcrypt.hash(password, 12);
        const newUser = {
            email,
            password,
            role,
            firstName,
            lastName,
        };
        if ((await this.userService.findEmail(newUser.email)) != null) {
            return res.send({
                status: 'error',
                message: 'Email exists',
            });
        }
        else {
            const ret = await this.userService.createUser(newUser);
            return res.status(common_1.HttpStatus.CREATED).send(Object.assign(Object.assign({}, ret), { status: 'success', message: 'Register successfully' }));
        }
    }
};
__decorate([
    (0, common_1.UseGuards)(guards_1.AtGuard),
    (0, common_1.Get)('currentUser'),
    __param(0, (0, get_current_user_id_decorator_1.GetCurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getCurrentUser", null);
__decorate([
    (0, common_1.Get)('hello'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "register", null);
AppController = __decorate([
    (0, common_1.Controller)(),
    (0, swagger_1.ApiTags)('Auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        users_service_1.UsersService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map