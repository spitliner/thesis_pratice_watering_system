import mongoose from "mongoose";
import DeviceSchema from "../schema/device_schema.js";

const DeviceMongoModel = mongoose.model("device", DeviceSchema);

class DeviceModel {
    static async getDevice(deviceID: string) {
        return DeviceMongoModel.findById(deviceID).select("-__v");
    }

    static async getUserDeivce(userID: string) {
        return DeviceMongoModel.find({
            userID: userID
        }).select("-__v -userID");
    }

    static async changeDeviceName(deviceID: string, userID: string, newName: string) {
        const result = await DeviceMongoModel.findOneAndUpdate({
            _id: deviceID,
            userID: userID
        }, {
            name: newName
        }, {
            "new": true
        }).select("-__v -userID");
        return result;
    }

    static async changeDeviceType(deviceID: string, userID: string, editdType: string) {
        const result = await DeviceMongoModel.findOneAndUpdate({
            _id: deviceID,
            userID: userID
        }, {
            type: editdType 
        }, {
            "new": true
        });
        return result;
    }

    static async changeDeviceSettings(deviceID: string, userID: string, newSetting: string) {
        const result = await DeviceMongoModel.findOneAndUpdate({
            _id: deviceID,
            userID: userID
        }, {
            settings: newSetting 
        }, {
            "new": true
        });
        return result;
    }

    static async changeDeviceSchedule(deviceID: string, userID: string, newSchedule: string) {
        const result = await DeviceMongoModel.findOneAndUpdate({
            _id: deviceID,
            userID: userID,
        }, {
            schedules: newSchedule 
        }, {
            "new": true
        });
        return result;
    }
}

export default DeviceModel;