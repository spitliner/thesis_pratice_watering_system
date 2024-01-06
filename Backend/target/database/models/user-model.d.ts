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
/// <reference types="mongoose/types/inferschematype.js" />
import mongoose from 'mongoose';
declare const userModel: {
    getUser(userID: string): Promise<(mongoose.Document<unknown, {}, {
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
        _id: mongoose.Types.ObjectId;
    }) | null>;
    getUserData(userID: string): Promise<(mongoose.FlattenMaps<{
        id: string;
        email: string;
        password: string;
        settings?: string | null | undefined;
    }> & {
        _id: mongoose.Types.ObjectId;
    }) | null>;
    searchUser(userEmail: string): Promise<(mongoose.FlattenMaps<{
        id: string;
        email: string;
        password: string;
        settings?: string | null | undefined;
    }> & {
        _id: mongoose.Types.ObjectId;
    }) | null>;
    /**
     * If email availible, return true, otherwise return false
     * @param userEmail email to check
     * @returns
     */
    checkEmail(userEmail: string): Promise<boolean>;
    createUser(userEmail: string, password: string): Promise<(mongoose.Document<unknown, {}, {
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
        _id: mongoose.Types.ObjectId;
    }) | null>;
    changeSetting(userID: string, newSetting: string): Promise<boolean | undefined>;
    changeEmail(userID: string, newMail: string): Promise<boolean | undefined>;
    changePassword(userID: string, newPass: string): Promise<boolean | undefined>;
    deleteUser(userID: string): Promise<boolean>;
};
export default userModel;
//# sourceMappingURL=user-model.d.ts.map