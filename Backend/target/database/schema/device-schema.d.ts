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
declare const deviceSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    type: string;
    id: string;
    userID: string;
    name: string;
    apiKey: string;
    adaUsername: string;
    feedID: string;
    settings: string;
    schedules?: mongoose.Types.DocumentArray<{
        [x: number]: string | null;
    }> | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    type: string;
    id: string;
    userID: string;
    name: string;
    apiKey: string;
    adaUsername: string;
    feedID: string;
    settings: string;
    schedules?: mongoose.Types.DocumentArray<{
        [x: number]: string | null;
    }> | null | undefined;
}>> & mongoose.FlatRecord<{
    type: string;
    id: string;
    userID: string;
    name: string;
    apiKey: string;
    adaUsername: string;
    feedID: string;
    settings: string;
    schedules?: mongoose.Types.DocumentArray<{
        [x: number]: string | null;
    }> | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
}>;
export default deviceSchema;
//# sourceMappingURL=device-schema.d.ts.map