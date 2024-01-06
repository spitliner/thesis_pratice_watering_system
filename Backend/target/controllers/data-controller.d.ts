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
declare const dataController: {
    getData(deviceID: string, userID: string): Promise<(import("mongoose").FlattenMaps<{
        id: string;
        data: string;
        deviceID: string;
        time: Date;
    }> & {
        _id: import("mongoose").Types.ObjectId;
    })[] | {
        error: string;
    }>;
    getDataWithin(deviceID: string, userID: string, afterDate: Date): Promise<(import("mongoose").FlattenMaps<{
        id: string;
        data: string;
        deviceID: string;
        time: Date;
    }> & {
        _id: import("mongoose").Types.ObjectId;
    })[] | {
        error: string;
    }>;
    insertFeed(deviceID: string, userID: string, feed: {
        id: string;
        deviceID: string;
        time: Date;
        data: string;
    }[]): Promise<{
        error: string;
        result?: undefined;
    } | {
        result: boolean;
        error?: undefined;
    }>;
};
export default dataController;
//# sourceMappingURL=data-controller.d.ts.map