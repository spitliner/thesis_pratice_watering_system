import mongoose from "mongoose";
import DeviceSchema from "../schema/device_schema.js";
const DeviceMongoModel = mongoose.model("device", DeviceSchema);
class DeviceModel {
    static async insertDevice(deviceID, userID, deviceType, deviceName, deviceSettings) {
        try {
            const result = await DeviceMongoModel.insertMany([{
                    id: deviceID,
                    userID: userID,
                    type: deviceType,
                    name: deviceName,
                    settings: deviceSettings
                }]);
            console.log("Insert device from user " + result[0].userID + " with device id " + result[0]._id);
            return result[0];
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }
    static async getDevice(deviceID) {
        return DeviceMongoModel.findOne({ id: deviceID }, "-__v -_id -userID").exec();
    }
    static async getDeviceData(deviceID, userID) {
        return DeviceMongoModel.findOne({ id: deviceID, userID: userID }, "-__v -_id -userID").lean().exec();
    }
    static async getUserDeivceData(userID) {
        return DeviceMongoModel.find({
            userID: userID
        }).select("-__v -_id -userID").lean().exec();
    }
    static async checkID(deviceID) {
        return 0 === await DeviceMongoModel.countDocuments({
            id: deviceID
        }).lean().exec();
    }
    static async checkKey(APIkey) {
        return 0 === await DeviceMongoModel.countDocuments({
            apiKey: APIkey
        }).lean().exec();
    }
    static async changeDeviceName(deviceID, userID, newName) {
        try {
            const device = await DeviceModel.getDevice(deviceID);
            if (null === device) {
                return false;
            }
            else if (userID !== device.userID) {
                return false;
            }
            device.name = newName;
            await device.save();
            return device.name === newName;
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
            else if (userID !== device.userID) {
                return false;
            }
            device.type = editdType;
            await device.save();
            return device.type === editdType;
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
            else if (userID !== device.userID) {
                return false;
            }
            device.settings = newSetting;
            await device.save();
            return device.settings === newSetting;
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
            else if (userID !== device.userID) {
                return false;
            }
            device.schedules = newSchedule;
            await device.save();
            return device.schedules === newSchedule;
            ;
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }
    static async changeAPIkey(deviceID, userID, apiKey) {
        try {
            const device = await DeviceModel.getDevice(deviceID);
            if (null === device) {
                return false;
            }
            else if (userID !== device.userID) {
                return false;
            }
            device.apiKey = apiKey;
            await device.save();
            return device.apiKey === apiKey;
            ;
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }
    static async deleteDevice(deviceID, userID) {
        const result = await DeviceMongoModel.deleteOne({
            id: deviceID,
            userID: userID
        });
        return 1 === result.deletedCount;
    }
    static async deleteUserDevice(userID) {
        const result = await DeviceMongoModel.deleteMany({
            userID: userID
        });
        return result.deletedCount;
    }
}
export default DeviceModel;
