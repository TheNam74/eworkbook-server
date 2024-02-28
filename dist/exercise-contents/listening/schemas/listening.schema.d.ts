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
import { Document } from 'mongoose';
export type ListeningDocument = Listening & Document;
declare class ListeningDetail {
    questionArray: {
        questionId: string;
        questionAudio: string;
    }[];
    answerArray: {
        answerId: string;
        answerImg: string;
        answerText: string;
    };
}
export declare class Listening {
    detail: ListeningDetail;
    correctAnswer: [{
        questionId: string;
        answerId: string;
    }];
}
export declare const ListeningSchema: import("mongoose").Schema<Listening, import("mongoose").Model<Listening, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Listening>;
export {};
