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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const fs = require("fs");
const bcrypt = require("bcrypt");
const mongoose_2 = require("mongoose");
const users_schema_1 = require("./schemas/users.schema");
const hashPassword_1 = require("../utils/hashPassword");
const randomstringGenerator = require("randomstring");
const sendGrid = require("@sendgrid/mail");
const email_content_1 = require("./template/email.content");
let UsersService = class UsersService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async findOne(email) {
        return await this.userModel.findOne({ email });
    }
    async getUser(id) {
        const user = await await this.userModel
            .findOne({ _id: id })
            .select('-password -isLock');
        if (user) {
            return { data: user, success: true };
        }
    }
    async createUser(user) {
        user.avatar = user.avatar || 'avatar.jpeg';
        const newUser = new this.userModel(user);
        await newUser.save();
        return newUser;
    }
    async findEmail(email) {
        return await this.userModel.findOne({ email: email });
    }
    async resetRefreshToken(id) {
        return await this.userModel.findByIdAndUpdate(id, { refreshToken: null });
    }
    async updateRefreshToken(id, refreshToken) {
        return await this.userModel.findByIdAndUpdate(id, { refreshToken });
    }
    async getUserById(id) {
        return await this.userModel.findById(id);
    }
    async getUserByEmail(email) {
        return await this.userModel.findOne({
            email
        });
    }
    async updateAvatar(newAvatar, userId) {
        const user = await this.userModel.findOne({ _id: userId });
        const oldAvt = user.avatar;
        user.avatar = newAvatar;
        user.save();
        if (oldAvt !== 'avatar.jpeg')
            try {
                fs.unlinkSync(`./uploads/images/avatars/${oldAvt}`);
            }
            catch (err) {
                console.error(err);
            }
    }
    async updateUser(user) {
        const userId = user._id;
        delete user._id;
        const userChanged = { $set: user };
        if (!user.DOB)
            userChanged.$unset = { DOB: 1 };
        try {
            await this.userModel.findOneAndUpdate({ _id: userId }, userChanged);
        }
        catch (error) {
            console.log('update user service error', error);
        }
        const updatedUser = await this.userModel.findOne({ _id: userId });
        return updatedUser;
    }
    async updatePassword(passwords, userId) {
        const user = await this.userModel.findOne({ _id: userId });
        const matched = await bcrypt.compare(passwords.oldPassword, user.password);
        if (matched) {
            user.password = await (0, hashPassword_1.default)(passwords.newPassword);
            user.save();
            return { success: true };
        }
        else
            return { success: false };
    }
    async getSimilarEmail(email) {
        return await this.userModel.find({ email: { $regex: email } });
    }
    async updateRandomString(user, randomString) {
        try {
            return await this.userModel.findByIdAndUpdate(user._id, {
                randomString: randomString,
            });
        }
        catch (error) {
            console.log('update user service error', error);
        }
    }
    async sentMail(filter, clientSide) {
        const email = filter.email;
        const userFindedByEmail = await this.findOne(email);
        const resetPasswordCode = randomstringGenerator.generate();
        if (userFindedByEmail === null) {
            return false;
        }
        await this.updateRandomString(userFindedByEmail, resetPasswordCode);
        sendGrid.setApiKey(process.env.API_SEND_MAIL_KEY);
        const message = {
            to: email,
            from: 'eworkbook.official@gmail.com',
            subject: 'The reset password link for eworkbook',
            text: 'This is text property',
            html: (0, email_content_1.emailContent)(userFindedByEmail, filter, clientSide, resetPasswordCode),
        };
        sendGrid
            .send(message)
            .then(() => {
            console.log('Email sent...');
        })
            .catch((error) => {
            console.log('Get error...', error.message);
        });
        return true;
    }
    async resetForgottenPassword(email, randomString, newPassword) {
        if (email === null)
            return false;
        try {
            const userFindedByEmailAndRandomString = await this.userModel.findOne({
                email: email,
                randomString: randomString,
            });
            if (userFindedByEmailAndRandomString === null) {
                return false;
            }
            userFindedByEmailAndRandomString.password = await (0, hashPassword_1.default)(newPassword);
            userFindedByEmailAndRandomString.randomString =
                randomstringGenerator.generate();
            userFindedByEmailAndRandomString.save();
            return true;
        }
        catch (error) {
            console.log('reset forgotten password fail with error: ', error);
        }
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(users_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map