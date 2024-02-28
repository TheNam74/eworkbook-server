/// <reference types="multer" />
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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdatePasswordDto } from './dtos/update-password.dto';
import { CheckRandomString } from './dtos/check-random-string.dto';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UsersService);
    updateUser(user: CreateUserDto): Promise<import("./schemas/users.schema").User & import("mongoose").Document<any, any, any> & {
        _id: string;
    } & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    updatePassword(passwords: UpdatePasswordDto, userId: string): Promise<{
        success: boolean;
    }>;
    getImage(filename: string, res: any): import("rxjs").Observable<any>;
    resetForgottenPassword(resetPassword: ResetPasswordDto): Promise<boolean>;
    sendMail(req: any): Promise<boolean>;
    resetPassword(checkRandomStringBody: CheckRandomString): Promise<boolean>;
    handleUpload(file: Express.Multer.File, userId: string): Promise<void>;
    getSimilarEmail(email: string): Promise<(import("./schemas/users.schema").User & import("mongoose").Document<any, any, any> & {
        _id: string;
    } & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getUser(id: string): Promise<{
        data: import("./schemas/users.schema").User & import("mongoose").Document<any, any, any> & {
            _id: string;
        } & {
            _id: import("mongoose").Types.ObjectId;
        };
        success: boolean;
    }>;
}
