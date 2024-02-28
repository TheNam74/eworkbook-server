/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from 'mongoose';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdatePasswordDto } from './dtos/update-password.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User, UserDocument } from './schemas/users.schema';
export declare class UsersService {
    private readonly userModel;
    constructor(userModel: Model<UserDocument>);
    findOne(email: string): Promise<UserDocument | undefined>;
    getUser(id: string): Promise<{
        data: User & import("mongoose").Document<any, any, any> & {
            _id: string;
        } & {
            _id: import("mongoose").Types.ObjectId;
        };
        success: boolean;
    }>;
    createUser(user: CreateUserDto): Promise<any>;
    findEmail(email: any): Promise<any>;
    resetRefreshToken(id: string): Promise<any>;
    updateRefreshToken(id: string, refreshToken: string): Promise<any>;
    getUserById(id: string): Promise<any>;
    getUserByEmail(email: string): Promise<any>;
    updateAvatar(newAvatar: any, userId: any): Promise<void>;
    updateUser(user: UpdateUserDto): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: string;
    } & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    updatePassword(passwords: UpdatePasswordDto, userId: string): Promise<{
        success: boolean;
    }>;
    getSimilarEmail(email: string): Promise<(User & import("mongoose").Document<any, any, any> & {
        _id: string;
    } & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    updateRandomString(user: UpdateUserDto, randomString: string): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: string;
    } & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    sentMail(filter: any, clientSide: any): Promise<boolean>;
    resetForgottenPassword(email: string, randomString: string, newPassword: string): Promise<boolean>;
}
