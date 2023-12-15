import mongoose from "mongoose";
import DeviceSchema from "../schema/device_schema.js";
const DeviceMongoModel = mongoose.model("device", DeviceSchema);
class DeviceModel {
    static async insertDevice(deviceID, userID, deviceType, deviceName, deviceSettings, apiKey, adaUsername) {
        try {
            const result = await DeviceMongoModel.insertMany([{
                    id: deviceID,
                    userID: userID,
                    type: deviceType,
                    name: deviceName,
                    settings: deviceSettings,
                    apiKey: apiKey,
                    adaUserName: adaUsername
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
        return DeviceMongoModel.findOne({ id: deviceID }, "-__v").exec();
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
    static async checkKey(APIkey, adaUserName) {
        return 0 === await DeviceMongoModel.countDocuments({
            apiKey: APIkey,
            adaUserName: adaUserName
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
            const result = await DeviceMongoModel.updateOne({ id: deviceID }, { name: newName }).lean().exec();
            return result.acknowledged;
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
            const result = await DeviceMongoModel.updateOne({ id: deviceID }, { type: editdType }).lean().exec();
            return result.acknowledged;
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
            const result = await DeviceMongoModel.updateOne({ id: deviceID }, { settings: newSetting }).lean().exec();
            return result.acknowledged;
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
            const result = await DeviceMongoModel.updateOne({ id: deviceID }, { schedules: newSchedule }).lean().exec();
            console.log(result);
            return result.acknowledged;
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }
    static async removeDeviceSchedule(deviceID, userID) {
        try {
            const device = await DeviceModel.getDevice(deviceID);
            if (null === device) {
                return false;
            }
            else if (userID !== device.userID) {
                return false;
            }
            const result = await DeviceMongoModel.updateOne({ id: deviceID }, { $unset: { schedules: [[]] } }).lean().exec();
            console.log(result);
            return result.acknowledged;
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }
    static async changeAPIkey(deviceID, userID, apiKey, adaUserName) {
        try {
            const device = await DeviceModel.getDevice(deviceID);
            if (null === device) {
                return false;
            }
            else if (userID !== device.userID) {
                return false;
            }
            const result = await DeviceMongoModel.updateOne({ id: deviceID }, { apiKey: apiKey, adaUserName: adaUserName }).lean().exec();
            return result.acknowledged;
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
    static async getAllDeviceData() {
        return DeviceMongoModel.find().lean().exec();
    }
    static async getAllSensorData() {
        return DeviceMongoModel.find({
            schedules: [undefined, null]
        }).lean().exec();
    }
    static async getDeviceWithSchedules(time) {
        return DeviceMongoModel.find({
            schedules: {
                $elemMatch: {
                    $elemMatch: {
                        $in: [time]
                    }
                }
            }
        }).lean().exec();
    }
}
export default DeviceModel;
