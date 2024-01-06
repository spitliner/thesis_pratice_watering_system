/* eslint-disable max-params */
/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/naming-convention */
import mongoose from 'mongoose';
import {customAlphabet} from 'nanoid';
import deviceSchema from '../schema/device-schema.js';

const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const uidGen = customAlphabet(alphabet, 16);

const deviceMongoModel = mongoose.model('device', deviceSchema);

const deviceModel = {
    async insertDevice(feedID: string, userID: string, deviceType: string, deviceName: string, deviceSettings: string, apiKey: string, adaUsername: string) {
        try {
            const deviceID = uidGen();
            const result = await deviceMongoModel.insertMany([{
                id: deviceID,
                userID: userID,
                type: deviceType,
                name: deviceName,
                settings: deviceSettings,
                apiKey: apiKey,
                adaUsername: adaUsername,
                feedID: feedID,
            }]);

            await deviceModel.removeDeviceSchedule(deviceID, userID);
            console.log('Insert device from user ' + result[0].userID + ' with device id ' + String(result[0].id));
            return await deviceModel.getDeviceData(deviceID);
        } catch (error) {
            console.log(error);
            return {
                error: 'database error',
            };
        }
    },

    async getDevice(deviceID: string) {
        return deviceMongoModel.findOne({id: deviceID}, '-__v').exec();
    },

    async getDeviceData(deviceID: string) {
        return deviceMongoModel.findOne({id: deviceID}, '-__v -_id -userID').lean().exec();
    },

    async getUserDeivceData(userID: string) {
        return deviceMongoModel.find({
            userID: userID,
        }).select('-__v -_id -userID').lean().exec();
    },

    async checkID(deviceID: string) {
        return 0 === await deviceMongoModel.countDocuments({
            id: deviceID,
        }).lean().exec();
    },

    async checkFeedKey(feedID: string, adaUsername: string) {
        return 0 === await deviceMongoModel.countDocuments({
            adaUsername: adaUsername,
            feedID: feedID,
        }).lean().exec();
    },

    async changeDeviceName(deviceID: string, userID: string, newName: string) {
        try {
            const device = await deviceModel.getDevice(deviceID);
            if (null === device) {
                return {
                    error: 'device not found',
                };
            }

            if (userID !== device.userID) {
                return {
                    error: 'device not belong to user',
                };
            }

            const result = await deviceMongoModel.updateOne({id: deviceID}, {name: newName}).lean().exec();
            return result.acknowledged;
        } catch (error) {
            console.log(error);
            return {
                error: 'database error',
            };
        }
    },

    async changeDeviceType(deviceID: string, userID: string, editdType: string) {
        try {
            const device = await deviceModel.getDevice(deviceID);
            if (null === device) {
                return {
                    error: 'device not found',
                };
            }

            if (userID !== device.userID) {
                return {
                    error: 'device not belong to user',
                };
            }

            const result = await deviceMongoModel.updateOne({id: deviceID}, {type: editdType}).lean().exec();
            return result.acknowledged;
        } catch (error) {
            console.log(error);
            return {
                error: 'database error',
            };
        }
    },

    async changeDeviceSettings(deviceID: string, userID: string, newSetting: string) {
        try {
            const device = await deviceModel.getDevice(deviceID);
            if (null === device) {
                return {
                    error: 'device not found',
                };
            }

            if (userID !== device.userID) {
                return {
                    error: 'device not belong to user',
                };
            }

            const result = await deviceMongoModel.updateOne({id: deviceID}, {settings: newSetting}).lean().exec();
            return result.acknowledged;
        } catch (error) {
            console.log(error);
            return {
                error: 'database error',
            };
        }
    },

    async changeDeviceSchedule(deviceID: string, userID: string, newSchedule: string[][]) {
        try {
            const device = await deviceModel.getDevice(deviceID);
            if (null === device) {
                return {
                    error: 'device not found',
                };
            }

            if (userID !== device.userID) {
                return {
                    error: 'device not belong to user',
                };
            }

            const result = await deviceMongoModel.updateOne({id: deviceID}, {schedules: newSchedule}).lean().exec();
            console.log(result);
            return result.acknowledged;
        } catch (error) {
            console.log(error);
            return {
                error: 'database error',
            };
        }
    },

    async removeDeviceSchedule(deviceID: string, userID: string) {
        try {
            const device = await deviceModel.getDevice(deviceID);
            if (null === device) {
                return {
                    error: 'device not found',
                };
            }

            if (userID !== device.userID) {
                return {
                    error: 'device not belong to user',
                };
            }

            const result = await deviceMongoModel.updateOne({id: deviceID}, {$unset: {schedules: [[]]}}).lean().exec();
            return {
                result: result.acknowledged,
            };
        } catch (error) {
            console.log(error);
            return {
                error: 'database error',
            };
        }
    },

    async changeAdafruitAccess(deviceID: string, userID: string, apiKey: string, adaUsername: string, feedID: string) {
        try {
            const device = await deviceModel.getDevice(deviceID);
            if (null === device) {
                return {
                    error: 'device not found',
                };
            }

            if (userID !== device.userID) {
                return {
                    error: 'device not belong to user',
                };
            }

            const result = await deviceMongoModel.updateOne({id: deviceID}, {apiKey: apiKey, adaUsername: adaUsername, feedID: feedID}).lean().exec();
            return {
                result: result.acknowledged,
            };
        } catch (error) {
            console.log(error);
            return {
                error: 'database error',
            };
        }
    },

    async changeDeviceFeedLimit(deviceID: string, userID: string, newLimit: number[]) {
        try {
            const device = await deviceModel.getDevice(deviceID);
            if (null === device) {
                return {
                    error: 'device not found',
                };
            }

            if (userID !== device.userID) {
                return {
                    error: 'device not belong to user',
                };
            }

            const result = await deviceMongoModel.updateOne({id: deviceID}, {limit: newLimit}).lean().exec();
            return {
                result: result.acknowledged,
            };
        } catch (error) {
            console.log(error);
            return {
                error: 'database error',
            };
        }
    },

    async deleteDevice(deviceID: string) {
        const result = await deviceMongoModel.deleteOne({
            id: deviceID,
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
