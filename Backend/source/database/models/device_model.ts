import mongoose from "mongoose";
import DeviceSchema from "../schema/device_schema.js";

const DeviceMongoModel = mongoose.model("device", DeviceSchema);

const deviceModel = {
    async insertDevice(deviceID: string, userID: string, deviceType: string, deviceName: string, deviceSettings: string, apiKey: string, adaUsername: string) {
        try {
            const result = await DeviceMongoModel.insertMany([{
                id: deviceID,
                userID: userID,
                type: deviceType,
                name: deviceName,
                settings: deviceSettings,
                apiKey: apiKey,
                adaUsername: adaUsername
            }]);
            deviceModel.removeDeviceSchedule(deviceID, userID);
            console.log("Insert device from user " + result[0].userID + " with device id " + result[0].id);
            return result[0];
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async getDevice(deviceID: string) {
        return DeviceMongoModel.findOne({id: deviceID}, "-__v").exec();
    },

    async getDeviceData(deviceID: string, userID: string) {
        return DeviceMongoModel.findOne({id: deviceID, userID: userID}, "-__v -_id -userID").lean().exec();
    },

    async getUserDeivceData(userID: string) {
        return DeviceMongoModel.find({
            userID: userID
        }).select("-__v -_id -userID").lean().exec();
    },

    async checkID(deviceID: string) {
        return 0 === await DeviceMongoModel.countDocuments({
            id: deviceID
        }).lean().exec();
    },


    async checkKey(APIkey: string, adaUsername: string) {
        return 0 === await DeviceMongoModel.countDocuments({
            apiKey: APIkey,
            adaUsername: adaUsername
        }).lean().exec();
    },

    async changeDeviceName(deviceID: string, userID: string, newName: string) {
        try {
            const device = await deviceModel.getDevice(deviceID);
            if (null === device) {
                return false;
            } else if (userID !== device.userID) {
                return false;
            }
            const result = await DeviceMongoModel.updateOne({id: deviceID}, {name: newName}).lean().exec();
            return result.acknowledged;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async changeDeviceType(deviceID: string, userID: string, editdType: string) {
        try {
            const device = await deviceModel.getDevice(deviceID);
            if (null === device) {
                return false;
            } else if (userID !== device.userID) {
                return false;
            }
            const result = await DeviceMongoModel.updateOne({id: deviceID}, {type: editdType}).lean().exec();
            return result.acknowledged;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async changeDeviceSettings(deviceID: string, userID: string, newSetting: string) {
        try {
            const device = await deviceModel.getDevice(deviceID);
            if (null === device) {
                return false;
            } else if (userID !== device.userID) {
                return false;
            }
            const result = await DeviceMongoModel.updateOne({id: deviceID}, {settings: newSetting}).lean().exec();
            return result.acknowledged;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async changeDeviceSchedule(deviceID: string, userID: string, newSchedule: string[][]) {
        try {
            const device = await deviceModel.getDevice(deviceID);
            if (null === device) {
                return false;
            } else if (userID !== device.userID) {
                return false;
            }
            const result = await DeviceMongoModel.updateOne({id: deviceID}, {schedules: newSchedule}).lean().exec();
            console.log(result);
            return result.acknowledged;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async removeDeviceSchedule(deviceID: string, userID: string) {
        try {
            const device = await deviceModel.getDevice(deviceID);
            if (null === device) {
                return false;
            } else if (userID !== device.userID) {
                return false;
            }
            const result = await DeviceMongoModel.updateOne({id: deviceID}, {$unset: { schedules: [[]]} }).lean().exec();
            // console.log(result);
            return result.acknowledged;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async changeAPIkey(deviceID: string, userID: string, apiKey: string, adaUsername: string) {
        try {
            const device = await deviceModel.getDevice(deviceID);
            if (null === device) {
                return false;
            } else if (userID !== device.userID) {
                return false;
            }
            const result = await DeviceMongoModel.updateOne({id: deviceID}, {apiKey: apiKey, adaUsername: adaUsername}).lean().exec();
            return result.acknowledged;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async deleteDevice(deviceID: string, userID: string) {
        const result = await DeviceMongoModel.deleteOne({
            id: deviceID,
            userID: userID
        });
        return 1 === result.deletedCount;
    },

    async deleteUserDevice(userID: string) {
        const result = await DeviceMongoModel.deleteMany({
            userID: userID
        });
        return result.deletedCount;
    },

    async getAllDeviceData() {
        return DeviceMongoModel.find().lean().exec();
    },

    async getAllSensorData() {
        return DeviceMongoModel.find({
            schedules: {
                $exists: false
            }
        }).lean().exec();
    },

    async getDeviceWithSchedules(time: string) {
        return DeviceMongoModel.find({
            schedules: {
                $elemMatch: {
                    $elemMatch: {
                        $in : [time]
                    }
                }
            }
        }).lean().exec();
    }
}

export default deviceModel;