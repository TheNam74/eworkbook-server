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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const users_service_1 = require("../users/users.service");
const hashPassword_1 = require("../utils/hashPassword");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const convertToUserInfor = (user) => ({
    id: user._id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    grade: user.grade,
    gender: user.gender,
    DOB: user.DOB,
    avatar: user.avatar,
    role: user.role,
    address: user.address,
    phone: user.phone,
    isLock: user.isLock,
});
let AuthService = class AuthService {
    constructor(usersService, jwtService, httpService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.httpService = httpService;
    }
    async loginOtherServiceProvider(req) {
        if (!req.user) {
            return 'No user from this service provider';
        }
        const user = await this.usersService.findOne(req.user.email);
        if (!user) {
            const newUser = await this.usersService.createUser({
                email: req.user.email,
                firstName: req.user.firstName,
                lastName: req.user.lastName,
                avatar: req.user.picture,
                password: 'abcd123456',
                role: 'Student',
            });
            const tokens = await this.getTokens(newUser._id, newUser.email);
            await this.updateRtHash(newUser._id, tokens.refresh_token);
            const userInfor = convertToUserInfor(newUser);
            return { tokens, user: userInfor };
        }
        const tokens = await this.getTokens(user._id, user.email);
        await this.updateRtHash(user._id, tokens.refresh_token);
        const userInfor = convertToUserInfor(user);
        return { tokens, user: userInfor };
    }
    async loginOtherServiceProviderMobile(accessToken) {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get('https://www.googleapis.com/userinfo/v2/me', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                }
            }));
            console.log(response.data);
            const user = response.data;
            const existedUser = await this.usersService.findOne(user.email);
            if (existedUser) {
                const tokens = await this.getTokens(existedUser._id, existedUser.email);
                await this.updateRtHash(existedUser._id, tokens.refresh_token);
                const userInfor = convertToUserInfor(existedUser);
                return { tokens, user: userInfor };
            }
            const newUser = await this.usersService.createUser({
                email: user.email,
                firstName: user.family_name,
                lastName: user.given_name,
                avatar: user.picture,
                password: 'abcd123456',
                role: 'Student',
            });
            const tokens = await this.getTokens(newUser._id, newUser.email);
            await this.updateRtHash(newUser._id, tokens.refresh_token);
            const userInfor = convertToUserInfor(newUser);
            return { tokens, user: userInfor };
        }
        catch (error) {
            throw new common_1.ForbiddenException('Invalid access token');
        }
    }
    ;
    async loginFacebookMobile(accessToken) {
        var _a, _b;
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`https://graph.facebook.com/me`, {
                params: {
                    fields: 'id,first_name,last_name,email,picture',
                    access_token: accessToken,
                },
            }));
            console.log(response.data);
            const user = response.data;
            const existedUser = await this.usersService.findOne(user.email);
            if (existedUser) {
                const tokens = await this.getTokens(existedUser._id, existedUser.email);
                await this.updateRtHash(existedUser._id, tokens.refresh_token);
                const userInfor = convertToUserInfor(existedUser);
                return { tokens, user: userInfor };
            }
            const newUser = await this.usersService.createUser({
                email: user.email,
                firstName: user.first_name,
                lastName: user.last_name,
                avatar: (_b = (_a = user.picture) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.url,
                password: 'abcd123456',
                role: 'Student',
            });
            const tokens = await this.getTokens(newUser._id, newUser.email);
            await this.updateRtHash(newUser._id, tokens.refresh_token);
            const userInfor = convertToUserInfor(newUser);
            return { tokens, user: userInfor };
        }
        catch (error) {
            throw new common_1.ForbiddenException('Invalid access token');
        }
    }
    ;
    async signupLocal(dto) {
        const { email, password, role, firstName, lastName } = dto;
        const hash = await (0, hashPassword_1.default)(password);
        const existedUser = await this.usersService.findOne(email);
        if (existedUser)
            throw new common_1.BadRequestException('Email already exists');
        const user = await this.usersService
            .createUser({
            email,
            password: hash,
            role,
            firstName,
            lastName,
        })
            .catch((error) => {
            throw error;
        });
        const tokens = await this.getTokens(user._id, user.email);
        await this.updateRtHash(user._id, tokens.refresh_token);
        const userInfor = convertToUserInfor(user);
        return { tokens, user: userInfor, status: 'success' };
    }
    async signinLocal(dto) {
        const { email, password, role } = dto;
        const user = await this.usersService.findOne(email);
        if (!user)
            throw new common_1.ForbiddenException('Access Denied');
        if (role != user.role)
            throw new common_1.ForbiddenException('Access Denied');
        const passwordMatches = await bcrypt.compare(password, user.password);
        if (!passwordMatches)
            throw new common_1.ForbiddenException('Access Denied');
        const tokens = await this.getTokens(user._id, user.email);
        await this.updateRtHash(user._id, tokens.refresh_token);
        const userInfor = convertToUserInfor(user);
        return { tokens, user: userInfor, status: 'success' };
    }
    async logout(userId) {
        await this.usersService.resetRefreshToken(userId);
        return true;
    }
    async refreshTokens(userId, rt) {
        const user = (await this.usersService.getUserById(userId));
        if (!user || !user.refreshToken)
            throw new common_1.ForbiddenException('Access Denied');
        const rtMatches = await bcrypt.compare(rt, user.refreshToken);
        if (!rtMatches)
            throw new common_1.ForbiddenException('Access Denied');
        const tokens = await this.getTokens(user._id, user.email);
        await this.updateRtHash(user._id, tokens.refresh_token);
        return tokens;
    }
    async updateRtHash(userId, rt) {
        const hash = await bcrypt.hash(rt, 12);
        await this.usersService.updateRefreshToken(userId, hash);
    }
    async getTokens(userId, email) {
        const jwtPayload = {
            sub: userId,
            email: email,
        };
        const [at, rt] = await Promise.all([
            this.jwtService.signAsync(jwtPayload, {
                secret: process.env.AT_SECRET,
                expiresIn: process.env.AT_SECRET_TIME,
            }),
            this.jwtService.signAsync(jwtPayload, {
                secret: process.env.RT_SECRET,
                expiresIn: process.env.RT_SECRET_TIME,
            }),
        ]);
        return {
            access_token: at,
            refresh_token: rt,
        };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        axios_1.HttpService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map