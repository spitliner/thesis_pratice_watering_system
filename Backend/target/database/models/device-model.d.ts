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
declare const deviceModel: {
    insertDevice(feedID: string, userID: string, deviceType: string, deviceName: string, deviceSettings: string, apiKey: string, adaUsername: string): Promise<(mongoose.FlattenMaps<{
        type: string;
        id: string;
        userID: string;
        name: string;
        apiKey: string;
        adaUsername: string;
        feedID: string;
        settings: string;
        limit: number[];
        schedules?: mongoose.Types.DocumentArray<{
            [x: number]: string | null;
        }> | null | undefined;
    }> & {
        _id: mongoose.Types.ObjectId;
    }) | {
        error: string;
    } | null>;
    getDevice(deviceID: string): Promise<(mongoose.Document<unknown, {}, {
        type: string;
        id: string;
        userID: string;
        name: string;
        apiKey: string;
        adaUsername: string;
        feedID: string;
        settings: string;
        limit: number[];
        schedules?: mongoose.Types.DocumentArray<{
            [x: number]: string | null;
        }> | null | undefined;
    }> & {
        type: string;
        id: string;
        userID: string;
        name: string;
        apiKey: string;
        adaUsername: string;
        feedID: string;
        settings: string;
        limit: number[];
        schedules?: mongoose.Types.DocumentArray<{
            [x: number]: string | null;
        }> | null | undefined;
    } & {
        _id: mongoose.Types.ObjectId;
    }) | null>;
    getDeviceData(deviceID: string): Promise<(mongoose.FlattenMaps<{
        type: string;
        id: string;
        userID: string;
        name: string;
        apiKey: string;
        adaUsername: string;
        feedID: string;
        settings: string;
        limit: number[];
        schedules?: mongoose.Types.DocumentArray<{
            [x: number]: string | null;
        }> | null | undefined;
    }> & {
        _id: mongoose.Types.ObjectId;
    }) | null>;
    getUserDeivceData(userID: string): Promise<(mongoose.FlattenMaps<{
        type: string;
        id: string;
        userID: string;
        name: string;
        apiKey: string;
        adaUsername: string;
        feedID: string;
        settings: string;
        limit: number[];
        schedules?: mongoose.Types.DocumentArray<{
            [x: number]: string | null;
        }> | null | undefined;
    }> & {
        _id: mongoose.Types.ObjectId;
    })[]>;
    checkID(deviceID: string): Promise<boolean>;
    checkFeedKey(feedID: string, adaUsername: string): Promise<boolean>;
    changeDeviceName(deviceID: string, userID: string, newName: string): Promise<boolean | {
        error: string;
    }>;
    changeDeviceType(deviceID: string, userID: string, editdType: string): Promise<boolean | {
        error: string;
    }>;
    changeDeviceSettings(deviceID: string, userID: string, newSetting: string): Promise<boolean | {
        error: string;
    }>;
    changeDeviceSchedule(deviceID: string, userID: string, newSchedule: string[][]): Promise<boolean | {
        error: string;
    }>;
    removeDeviceSchedule(deviceID: string, userID: string): Promise<{
        error: string;
        result?: undefined;
    } | {
        result: boolean;
        error?: undefined;
    }>;
    changeAdafruitAccess(deviceID: string, userID: string, apiKey: string, adaUsername: string, feedID: string): Promise<{
        error: string;
        result?: undefined;
    } | {
        result: boolean;
        error?: undefined;
    }>;
    changeDeviceFeedLimit(deviceID: string, userID: string, newLimit: number[]): Promise<{
        error: string;
        result?: undefined;
    } | {
        result: boolean;
        error?: undefined;
    }>;
    deleteDevice(deviceID: string): Promise<boolean>;
    deleteUserDevice(userID: string): Promise<number>;
    getAllDeviceData(): Promise<(mongoose.FlattenMaps<{
        type: string;
        id: string;
        userID: string;
        name: string;
        apiKey: string;
        adaUsername: string;
        feedID: string;
        settings: string;
        limit: number[];
        schedules?: mongoose.Types.DocumentArray<{
            [x: number]: string | null;
        }> | null | undefined;
    }> & {
        _id: mongoose.Types.ObjectId;
    })[]>;
    getDeviceWithSchedules(time: string): Promise<(mongoose.FlattenMaps<{
        type: string;
        id: string;
        userID: string;
        name: string;
        apiKey: string;
        adaUsername: string;
        feedID: string;
        settings: string;
        limit: number[];
        schedules?: mongoose.Types.DocumentArray<{
            [x: number]: string | null;
        }> | null | undefined;
    }> & {
        _id: mongoose.Types.ObjectId;
    })[]>;
};
export default deviceModel;
//# sourceMappingURL=device-model.d.ts.map
