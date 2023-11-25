import mongoose from "mongoose";
import DeviceSchema from "../schema/device_schema.js";
const DeviceMongoModel = mongoose.model("device", DeviceSchema);
class DeviceModel {
    static async getDevice(deviceID) {
        return DeviceMongoModel.findById(deviceID).select("-__v");
    }
    static async getUserDeivce(userID) {
        return DeviceMongoModel.find({
            userID: userID
        }).select("-__v -userID");
    }
    static async changeDeviceName(deviceID, userID, newName) {
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
    static async changeDeviceType(deviceID, userID, editdType) {
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
    static async changeDeviceSettings(deviceID, userID, newSetting) {
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
    static async changeDeviceSchedule(deviceID, userID, newSchedule) {
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
