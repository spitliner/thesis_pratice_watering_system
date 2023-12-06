import mongoose from "mongoose";
import DeviceSchema from "../schema/device_schema.js";
const DeviceMongoModel = mongoose.model("device", DeviceSchema);
class DeviceModel {
    static async insertDevice(deviceID, userID, deviceType, deviceName, deviceSettings) {
        try {
            const result = await DeviceMongoModel.insertMany([{
                    _id: deviceID,
                    userID: userID,
                    type: deviceType,
                    name: deviceName,
                    settings: deviceSettings
                }]);
            console.log("Insert device from user " + result[0].userID + " with device id " + result[0]._id);
            return true;
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }
    static async getDevice(deviceID) {
        return DeviceMongoModel.findById(deviceID, "-__v").exec();
    }
    static async getDeviceData(deviceID) {
        return DeviceMongoModel.findById(deviceID, "-__v -userID").lean().exec();
    }
    static async getUserDeivce(userID) {
        return DeviceMongoModel.find({
            userID: userID
        }).select("-__v -userID").lean().exec();
    }
    static async changeDeviceName(deviceID, userID, newName) {
        try {
            const device = await DeviceModel.getDevice(deviceID);
            if (null === device) {
                return false;
            }
            device.name = newName;
            await device.save();
            return true;
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }
    static async changeDeviceType(deviceID, userID, editdType) {
        try {
            const device = await DeviceModel.getDevice(deviceID);
            if (null === device) {
                return false;
            }
            device.type = editdType;
            await device.save();
            return true;
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }
    static async changeDeviceSettings(deviceID, userID, newSetting) {
        try {
            const device = await DeviceModel.getDevice(deviceID);
            if (null === device) {
                return false;
            }
            device.settings = newSetting;
            await device.save();
            return true;
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }
    static async changeDeviceSchedule(deviceID, userID, newSchedule) {
        try {
            const device = await DeviceModel.getDevice(deviceID);
            if (null === device) {
                return false;
            }
            device.schedules = newSchedule;
            await device.save();
            return true;
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }
    static async deleteDevice(deviceID, userID) {
        const result = await DeviceMongoModel.deleteOne({
            _id: deviceID,
            userID: userID
        });
        return 1 === result.deletedCount;
    }
    static async deleteUserDevice(deviceID, userID) {
        const result = await DeviceMongoModel.deleteMany({
            userID: userID
        });
        return result.deletedCount;
    }
}
export default DeviceModel;
