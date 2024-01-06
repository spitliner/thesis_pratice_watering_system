/* eslint-disable max-params */
/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/naming-convention */
import mongoose from 'mongoose';
import { customAlphabet } from 'nanoid';
import deviceSchema from '../schema/device-schema.js';
const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const uidGen = customAlphabet(alphabet, 16);
const deviceMongoModel = mongoose.model('device', deviceSchema);
const deviceModel = {
    async insertDevice(feedID, userID, deviceType, deviceName, deviceSettings, apiKey, adaUsername) {
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
        }
        catch (error) {
            console.log(error);
            return {
                error: 'database error',
            };
        }
    },
    async getDevice(deviceID) {
        return deviceMongoModel.findOne({ id: deviceID }, '-__v').exec();
    },
    async getDeviceData(deviceID) {
        return deviceMongoModel.findOne({ id: deviceID }, '-__v -_id -userID').lean().exec();
    },
    async getUserDeivceData(userID) {
        return deviceMongoModel.find({
            userID: userID,
        }).select('-__v -_id -userID').lean().exec();
    },
    async checkID(deviceID) {
        return 0 === await deviceMongoModel.countDocuments({
            id: deviceID,
        }).lean().exec();
    },
    async checkFeedKey(feedID, adaUsername) {
        return 0 === await deviceMongoModel.countDocuments({
            adaUsername: adaUsername,
            feedID: feedID,
        }).lean().exec();
    },
    async changeDeviceName(deviceID, userID, newName) {
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
            const result = await deviceMongoModel.updateOne({ id: deviceID }, { name: newName }).lean().exec();
            return result.acknowledged;
        }
        catch (error) {
            console.log(error);
            return {
                error: 'database error',
            };
        }
    },
    async changeDeviceType(deviceID, userID, editdType) {
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
            const result = await deviceMongoModel.updateOne({ id: deviceID }, { type: editdType }).lean().exec();
            return result.acknowledged;
        }
        catch (error) {
            console.log(error);
            return {
                error: 'database error',
            };
        }
    },
    async changeDeviceSettings(deviceID, userID, newSetting) {
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
            const result = await deviceMongoModel.updateOne({ id: deviceID }, { settings: newSetting }).lean().exec();
            return result.acknowledged;
        }
        catch (error) {
            console.log(error);
            return {
                error: 'database error',
            };
        }
    },
    async changeDeviceSchedule(deviceID, userID, newSchedule) {
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
            const result = await deviceMongoModel.updateOne({ id: deviceID }, { schedules: newSchedule }).lean().exec();
            console.log(result);
            return result.acknowledged;
        }
        catch (error) {
            console.log(error);
            return {
                error: 'database error',
            };
        }
    },
    async removeDeviceSchedule(deviceID, userID) {
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
            const result = await deviceMongoModel.updateOne({ id: deviceID }, { $unset: { schedules: [[]] } }).lean().exec();
            return {
                result: result.acknowledged,
            };
        }
        catch (error) {
            console.log(error);
            return {
                error: 'database error',
            };
        }
    },
    async changeAdafruitAccess(deviceID, userID, apiKey, adaUsername, feedID) {
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
            const result = await deviceMongoModel.updateOne({ id: deviceID }, { apiKey: apiKey, adaUsername: adaUsername, feedID: feedID }).lean().exec();
            return {
                result: result.acknowledged,
            };
        }
        catch (error) {
            console.log(error);
            return {
                error: 'database error',
            };
        }
    },
    async deleteDevice(deviceID) {
        const result = await deviceMongoModel.deleteOne({
            id: deviceID,
        });
        return 1 === result.deletedCount;
    },
    async deleteUserDevice(userID) {
        const result = await deviceMongoModel.deleteMany({
            userID: userID,
        });
        return result.deletedCount;
    },
    async getAllDeviceData() {
        return deviceMongoModel.find().lean().exec();
    },
    async getDeviceWithSchedules(time) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV2aWNlLW1vZGVsLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL2FwMS9EZXNrdG9wL1RoZXNpcy90aGVzaXNfcHJhdGljZV93YXRlcmluZ19zeXN0ZW0vQmFja2VuZC9zb3VyY2UvIiwic291cmNlcyI6WyJkYXRhYmFzZS9tb2RlbHMvZGV2aWNlLW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLCtCQUErQjtBQUMvQixxQ0FBcUM7QUFDckMseURBQXlEO0FBQ3pELE9BQU8sUUFBUSxNQUFNLFVBQVUsQ0FBQztBQUNoQyxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sUUFBUSxDQUFDO0FBQ3RDLE9BQU8sWUFBWSxNQUFNLDRCQUE0QixDQUFDO0FBRXRELE1BQU0sUUFBUSxHQUFHLGdFQUFnRSxDQUFDO0FBQ2xGLE1BQU0sTUFBTSxHQUFHLGNBQWMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFFNUMsTUFBTSxnQkFBZ0IsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxZQUFZLENBQUMsQ0FBQztBQUVoRSxNQUFNLFdBQVcsR0FBRztJQUNoQixLQUFLLENBQUMsWUFBWSxDQUFDLE1BQWMsRUFBRSxNQUFjLEVBQUUsVUFBa0IsRUFBRSxVQUFrQixFQUFFLGNBQXNCLEVBQUUsTUFBYyxFQUFFLFdBQW1CO1FBQ2xKLElBQUksQ0FBQztZQUNELE1BQU0sUUFBUSxHQUFHLE1BQU0sRUFBRSxDQUFDO1lBQzFCLE1BQU0sTUFBTSxHQUFHLE1BQU0sZ0JBQWdCLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQzlDLEVBQUUsRUFBRSxRQUFRO29CQUNaLE1BQU0sRUFBRSxNQUFNO29CQUNkLElBQUksRUFBRSxVQUFVO29CQUNoQixJQUFJLEVBQUUsVUFBVTtvQkFDaEIsUUFBUSxFQUFFLGNBQWM7b0JBQ3hCLE1BQU0sRUFBRSxNQUFNO29CQUNkLFdBQVcsRUFBRSxXQUFXO29CQUN4QixNQUFNLEVBQUUsTUFBTTtpQkFDakIsQ0FBQyxD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