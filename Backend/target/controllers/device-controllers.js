import adaConnect from '../cron-jobs/ada-request.js';
import deviceModel from '../database/models/device-model.js';
import dataController from './data-controller.js';
const deviceController = {
    async createDevice(feedID, userID, name, type, apiKey, adaUsername) {
        try {
            if (!(await deviceModel.checkID(feedID))) {
                return {
                    error: 'Device already in use',
                };
            }
            const deviceSetting = {};
            const device = await deviceModel.insertDevice(feedID, userID, type, name, JSON.stringify(deviceSetting), apiKey, adaUsername);
            if (null === device || undefined === device) {
                return {
                    error: 'Database error',
                };
            }
            return {
                result: device,
            };
        }
        catch (error) {
            console.log(error);
            return {
                error: 'Server error',
            };
        }
    },
    async getDevice(deviceID, userID) {
        try {
            return await deviceModel.getDeviceData(deviceID);
        }
        catch (error) {
            console.log(error);
            return undefined;
        }
    },
    async getUserDevice(userID) {
        try {
            return await deviceModel.getUserDeivceData(userID);
        }
        catch (error) {
            console.log(error);
            return undefined;
        }
    },
    async deleteDevice(deviceID, userID) {
        try {
            return await deviceModel.deleteDevice(deviceID);
        }
        catch (error) {
            console.log(error);
            return null;
        }
    },
    async changeSchedule(deviceID, userID, newSchedule) {
        try {
            let result = null;
            result = await (undefined === newSchedule ? deviceModel.removeDeviceSchedule(deviceID, userID) : deviceModel.changeDeviceSchedule(deviceID, userID, newSchedule));
            if (null === result) {
                return {
                    error: 'database error',
                };
            }
            if (!result) {
                return {
                    error: 'device not found',
                };
            }
            return {
                result: 'change save',
            };
        }
        catch (error) {
            console.log(error);
            return {
                error: 'unexpected error',
            };
        }
    },
    async changeSettings(deviceID, userID, newSettings) {
        try {
            const result = await deviceModel.changeDeviceSettings(deviceID, userID, JSON.stringify(newSettings));
            if (null === result) {
                return {
                    error: 'database error',
                };
            }
            if (!result) {
                return {
                    error: 'device not found',
                };
            }
            return {
                result: 'change save',
            };
        }
        catch (error) {
            console.log(error);
            return {
                error: 'unexpected error',
            };
        }
    },
    async changeType(deviceID, userID, editedType) {
        try {
            const result = await deviceModel.changeDeviceType(deviceID, userID, editedType);
            if (null === result) {
                return {
                    error: 'database error',
                };
            }
            if (!result) {
                return {
                    error: 'device not found',
                };
            }
            return {
                result: 'change save',
            };
        }
        catch (error) {
            console.log(error);
            return {
                error: 'unexpected error',
            };
        }
    },
    async changeName(deviceID, userID, newName) {
        try {
            const result = await deviceModel.changeDeviceName(deviceID, userID, newName);
            if (null === result) {
                return {
                    error: 'database error',
                };
            }
            if (!result) {
                return {
                    error: 'device not found',
                };
            }
            return {
                result: 'change save',
            };
        }
        catch (error) {
            console.log(error);
            return {
                error: 'unexpected error',
            };
        }
    },
    // eslint-disable-next-line @typescript-eslint/naming-convention
    async changeAPIkey(deviceID, userID, newKey, newUsername, newFeedName) {
        try {
            const result = await deviceModel.changeAdafruitAccess(deviceID, userID, newKey, newUsername, newFeedName);
            if (null === result) {
                return {
                    error: 'database error',
                };
            }
            if (!result) {
                return {
                    error: 'device not found',
                };
            }
            return {
                result: 'change save',
            };
        }
        catch (error) {
            console.log(error);
            return {
                error: 'unexpected error',
            };
        }
    },
    async triggerDeviceSchedules(time) {
        try {
            const deviceList = await deviceModel.getAllSensorData();
            const actionDeviceList = await deviceModel.getDeviceWithSchedules(time);
            const collectData = async (device) => {
                try {
                    await dataController.insertFeed(device.id, device.userID, await adaConnect.getFeedData(device.adaUsername, device.id, device.feedID, device.apiKey));
                }
                catch (error) {
                    console.log(error);
                }
            };
            const triggerSchedule = async (device) => {
                try {
                    let pumpTime = '1';
                    if (null !== device.schedules && undefined !== device.schedules) {
                        for (const schedule of device.schedules) {
                            if (schedule[0] === time) {
                                pumpTime = String(schedule[1]);
                                break;
                            }
                        }
                    }
                    await adaConnect.triggerPump(device.adaUsername, device.feedID, device.apiKey, pumpTime);
                }
                catch (error) {
                    console.log(error);
                }
            };
            for (const device of deviceList) {
                void collectData(device);
            }
            for (const device of actionDeviceList) {
                void triggerSchedule(device);
            }
        }
        catch (error) {
            console.log(error);
        }
    },
};
export default deviceController;
