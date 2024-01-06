/// <reference types="mongoose/types/aggregate.js" />
/// <reference types="mongoose/types/callback.js" />
/// <reference types="mongoose/types/collection.js" />
/// <reference types="mongoose/types/connection.js" />
/// <reference types="mongoose/types/cursor.js" />
/// <reference types="mongoose/types/document.js" />
/// <reference types="mongoose/types/error.js" />
/// <reference types="mongoose/types/expressions.js" />
/// <reference types="mongoose/types/helpers.js" />
/// <reference types="mongoose/types/middlewares.js" />
/// <reference types="mongoose/types/indexes.js" />
/// <reference types="mongoose/types/models.js" />
/// <reference types="mongoose/types/mongooseoptions.js" />
/// <reference types="mongoose/types/pipelinestage.js" />
/// <reference types="mongoose/types/populate.js" />
/// <reference types="mongoose/types/query.js" />
/// <reference types="mongoose/types/schemaoptions.js" />
/// <reference types="mongoose/types/schematypes.js" />
/// <reference types="mongoose/types/session.js" />
/// <reference types="mongoose/types/types.js" />
/// <reference types="mongoose/types/utility.js" />
/// <reference types="mongoose/types/validation.js" />
/// <reference types="mongoose/types/virtuals.js" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype.js" />
declare const userController: {
    getUser(userID: string): Promise<{
        error: string;
        usr?: undefined;
    } | {
        usr: import("mongoose").FlattenMaps<{
            id: string;
            email: string;
            password: string;
            settings?: string | null | undefined;
        }> & {
            _id: import("mongoose").Types.ObjectId;
        };
        error?: undefined;
    }>;
    login(email: string, password: string): Promise<{
        error: string;
        bearerToken?: undefined;
        uid?: undefined;
        tokenType?: undefined;
    } | {
        bearerToken: string;
        uid: string;
        tokenType: string;
        error?: undefined;
    }>;
    checkPasswordLength(password: string): boolean;
    checkEmailDublication(email: string): Promise<boolean>;
    createUser(email: string, password: string): Promise<{
        error: string;
        usr?: undefined;
    } | {
        usr: (import("mongoose").Document<unknown, {}, {
            id: string;
            email: string;
            password: string;
            settings?: string | null | undefined;
        }> & {
            id: string;
            email: string;
            password: string;
            settings?: string | null | undefined;
        } & {
            _id: import("mongoose").Types.ObjectId;
        }) | null;
        error?: undefined;
    }>;
    getUserDevice(userID: string): Promise<(import("mongoose").FlattenMaps<{
        type: string;
        id: string;
        userID: string;
        name: string;
        apiKey: string;
        adaUsername: string;
        feedID: string;
        settings: string;
        limit: number[];
        schedules?: import("mongoose").Types.DocumentArray<{
            [x: number]: string | null;
        }> | null | undefined;
    }> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    changeUserData(userID: string, change: {
        newSetting?: Record<string, unknown>;
        newEmail?: string;
        newPassword?: string;
    }): Promise<{
        error: string;
        result?: undefined;
    } | {
        result: string;
        error?: undefined;
    }>;
    deleteUser(userID: string): Promise<boolean>;
};
export default userController;
//# sourceMappingURL=user-controller.d.ts.map