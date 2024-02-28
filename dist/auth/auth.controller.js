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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const decorators_1 = require("../common/decorators");
const guards_1 = require("../common/guards");
const auth_service_1 = require("./auth.service");
const auth_dto_1 = require("./dto/auth.dto");
const passport_1 = require("@nestjs/passport");
const create_user_dto_1 = require("../users/dtos/create-user.dto");
const cookieConfig_1 = require("../utils/cookieConfig");
const mobile_google_auth_dto_1 = require("./dto/mobile-google-auth.dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async googleLogin(req, res) {
        const authInfor = await this.authService.loginOtherServiceProvider(req);
        res.cookie('access_token', authInfor.tokens.access_token, cookieConfig_1.accessTokenConfig);
        res.cookie('refresh_token', authInfor.tokens.refresh_token, cookieConfig_1.refreshTokenConfig);
        return res.status(200).redirect(process.env.CLIENT_URL);
    }
    async googleMobileLogin(dto, res) {
        const authInfor = await this.authService.loginOtherServiceProviderMobile(dto.accessToken);
        res.cookie('access_token', authInfor.tokens.access_token, cookieConfig_1.accessTokenConfig);
        res.cookie('refresh_token', authInfor.tokens.refresh_token, cookieConfig_1.refreshTokenConfig);
        return res.status(200).send(authInfor.user);
    }
    async facebookMobileLogin(dto, res) {
        const authInfor = await this.authService.loginFacebookMobile(dto.accessToken);
        res.cookie('access_token', authInfor.tokens.access_token, cookieConfig_1.accessTokenConfig);
        res.cookie('refresh_token', authInfor.tokens.refresh_token, cookieConfig_1.refreshTokenConfig);
        return res.status(200).send(authInfor.user);
    }
    async facebookLogin(req, res) {
        const authInfor = await this.authService.loginOtherServiceProvider(req);
        res.cookie('access_token', authInfor.tokens.access_token, cookieConfig_1.accessTokenConfig);
        res.cookie('refresh_token', authInfor.tokens.refresh_token, cookieConfig_1.refreshTokenConfig);
        return res.status(200).redirect(process.env.CLIENT_URL);
    }
    async signupLocal(dto, res) {
        const authInfor = await this.authService.signupLocal(dto);
        res.cookie('access_token', authInfor.tokens.access_token, cookieConfig_1.accessTokenConfig);
        res.cookie('refresh_token', authInfor.tokens.refresh_token, cookieConfig_1.refreshTokenConfig);
        return res.status(200).send(authInfor.user);
    }
    async signinLocal(dto, res) {
        const authInfor = await this.authService.signinLocal(dto);
        res.cookie('access_token', authInfor.tokens.access_token, cookieConfig_1.accessTokenConfig);
        res.cookie('refresh_token', authInfor.tokens.refresh_token, cookieConfig_1.refreshTokenConfig);
        return res.status(200).send(authInfor.user);
    }
    async logout(userId, res) {
        res.clearCookie('access_token');
        res.clearCookie('refresh_token');
        await this.authService.logout(userId);
        return res.send('Logout successfully');
    }
    async refreshTokens(userId, refreshToken, res) {
        const tokens = await this.authService.refreshTokens(userId, refreshToken);
        res.cookie('access_token', tokens.access_token, cookieConfig_1.accessTokenConfig);
        res.cookie('refresh_token', tokens.refresh_token, cookieConfig_1.refreshTokenConfig);
        return res.send(tokens);
    }
};
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)('google/login'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('google')),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleLogin", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)('google/mobile/login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mobile_google_auth_dto_1.MobileGoogleAuthDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleMobileLogin", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)('facebook/mobile/login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mobile_google_auth_dto_1.MobileGoogleAuthDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "facebookMobileLogin", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)('facebook/login'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('facebook')),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "facebookLogin", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)('local/signup'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signupLocal", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)('local/signin'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.AuthDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signinLocal", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.AtGuard),
    (0, common_1.Post)('logout'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, decorators_1.GetCurrentUserId)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.UseGuards)(guards_1.RtGuard),
    (0, common_1.Post)('refresh'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, decorators_1.GetCurrentUserId)()),
    __param(1, (0, decorators_1.GetCurrentUser)('refreshToken')),
    __param(2, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshTokens", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    (0, swagger_1.ApiTags)('Local Auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map