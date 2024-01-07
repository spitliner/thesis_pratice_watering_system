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
declare const deviceController: {
    createDevice(feedID: string, userID: string, name: string, type: string, apiKey: string, adaUsername: string): Promise<{
        error: string;
        result?: undefined;
    } | {
        result: (import("mongoose").FlattenMaps<{
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
        }) | {
            error: string;
        };
        error?: undefined;
    }>;
    getDevice(deviceID: string, userID: string): Promise<(import("mongoose").FlattenMaps<{
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
    }) | null | undefined>;
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
    })[] | undefined>;
    deleteDevice(deviceID: string, userID: string): Promise<boolean | null>;
    changeSchedule(deviceID: string, userID: string, newSchedule: string[][] | undefined): Promise<{
        error: string;
        result?: undefined;
    } | {
        result: string;
        error?: undefined;
    }>;
    changeSettings(deviceID: string, userID: string, newSettings: Record<string, unknown>): Promise<{
        error: string;
        result?: undefined;
    } | {
        result: string;
        error?: undefined;
    }>;
    changeType(deviceID: string, userID: string, editedType: string): Promise<{
        error: string;
        result?: undefined;
    } | {
        result: string;
        error?: undefined;
    }>;
    changeName(deviceID: string, userID: string, newName: string): Promise<{
        error: string;
        result?: undefined;
    } | {
        result: string;
        error?: undefined;
    }>;
    changeAPIkey(deviceID: string, userID: string, newKey: string, newUsername: string, newFeedName: string): Promise<{
        error: string;
        result?: undefined;
    } | {
        result: string;
        error?: undefined;
    }>;
    changeDeviceStatus(deviceID: string, userID: string, status: string): Promise<{
        error: string;
        result?: undefined;
    } | {
        result: string;
        error?: undefined;
    }>;
    changeDeviceLimit(deviceID: string, userID: string, limit: number[]): Promise<{
        error: string;
        result?: undefined;
    } | {
        result: boolean;
        error?: undefined;
    }>;
    getDeviceFeed(): Promise<void>;
    triggerDeviceSchedules(time: string): Promise<void>;
};
export default deviceController;
//# sourceMappingURL=device-controllers.d.ts.map
