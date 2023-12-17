import mongoose from 'mongoose';
import deviceSchema from '../schema/device-schema.js';

const deviceMongoModel = mongoose.model('device', deviceSchema);

const deviceModel = {
    async insertDevice(deviceID: string, userID: string, deviceType: string, deviceName: string, deviceSettings: string, apiKey: string, adaUsername: string) {
        try {
            const result = await deviceMongoModel.insertMany([{
                id: deviceID,
                userID: userID,
                type: deviceType,
                name: deviceName,
                settings: deviceSettings,
                apiKey: apiKey,
                adaUsername: adaUsername
            }]);

            await deviceModel.removeDeviceSchedule(deviceID, userID);
            console.log('Insert device from user ' + result[0].userID + ' with device id ' + String(result[0].id));
            return result[0];
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async getDevice(deviceID: string) {
        return deviceMongoModel.findOne({id: deviceID}, '-__v').exec();
    },

    async getDeviceData(deviceID: string, userID: string) {
        return deviceMongoModel.findOne({id: deviceID, userID: userID}, '-__v -_id -userID').lean().exec();
    },

    async getUserDeivceData(userID: string) {
        return deviceMongoModel.find({
            userID: userID
        }).select('-__v -_id -userID').lean().exec();
    },

    async checkID(deviceID: string) {
        return 0 === await deviceMongoModel.countDocuments({
            id: deviceID,
        }).lean().exec();
    },

    async checkKey(APIkey: string, adaUsername: string) {
        return 0 === await deviceMongoModel.countDocuments({
            apiKey: APIkey,
            adaUsername: adaUsername
        }).lean().exec();
    },

    async changeDeviceName(deviceID: string, userID: string, newName: string) {
        try {
            const device = await deviceModel.getDevice(deviceID);
            if (null === device) {
                return false;
            }

            if (userID !== device.userID) {
                return false;
            }

            const result = await deviceMongoModel.updateOne({id: deviceID}, {name: newName}).lean().exec();
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
            }

            if (userID !== device.userID) {
                return false;
            }

            const result = await deviceMongoModel.updateOne({id: deviceID}, {type: editdType}).lean().exec();
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
            }

            if (userID !== device.userID) {
                return false;
            }

            const result = await deviceMongoModel.updateOne({id: deviceID}, {settings: newSetting}).lean().exec();
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
            }

            if (userID !== device.userID) {
                return false;
            }

            const result = await deviceMongoModel.updateOne({id: deviceID}, {schedules: newSchedule}).lean().exec();
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
            }

            if (userID !== device.userID) {
                return false;
            }

            const result = await deviceMongoModel.updateOne({id: deviceID}, {$unset: { schedules: [[]]} }).lean().exec();
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
            }

            if (userID !== device.userID) {
                return false;
            }

            const result = await deviceMongoModel.updateOne({id: deviceID}, {apiKey: apiKey, adaUsername: adaUsername}).lean().exec();
            return result.acknowledged;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async deleteDevice(deviceID: string, userID: string) {
        const result = await deviceMongoModel.deleteOne({
            id: deviceID,
            userID: userID,
        });
        return 1 === result.deletedCount;
    },

    async deleteUserDevice(userID: string) {
        const result = await deviceMongoModel.deleteMany({
            userID: userID,
        });
        return result.deletedCount;
    },

    async getAllDeviceData() {
        return deviceMongoModel.find().lean().exec();
    },

    async getAllSensorData() {
        return deviceMongoModel.find({
            schedules: {
                $exists: false,
            },
        }).lean().exec();
    },

    async getDeviceWithSchedules(time: string) {
        return deviceMongoModel.find({
            schedules: {
                $elemMatch: {
                    $elemMatch: {
                        $in: [time],
                    },
                },
            },
        }).lean().exec();
    },
};

export default deviceModel;
