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
    async changeDeviceStatus(deviceID, userID, status) {
        try {
            const device = await deviceModel.getDevice(deviceID);
            if (null === device) {
                return {
                    error: 'device not found',
                };
            }
            console.log(userID);
            console.log(device.userID);
            if (userID !== device.userID) {
                return {
                    error: 'device not belong to user',
                };
            }
            const result = await adaConnect.modifiedStatus(device.adaUsername, device.feedID, device.apiKey, status);
            if (result) {
                return {
                    result: 'set status success',
                };
            }
            return {
                error: 'failed to set new status',
            };
        }
        catch (error) {
            console.log(error);
            return {
                error: 'unexpected error',
            };
        }
    },
    async getDeviceFeed() {
        try {
            const deviceList = await deviceModel.getAllDeviceData();
            const collectData = async (device) => {
                try {
                    await dataController.insertFeed(device.id, device.userID, await adaConnect.getFeedData(device.adaUsername, device.id, device.feedID, device.apiKey));
                }
                catch (error) {
                    console.log(error);
                }
            };
            for (const device of deviceList) {
                void collectData(device);
            }
        }
        catch (error) {
            console.log(error);
        }
    },
    async triggerDeviceSchedules(time) {
        try {
            const actionDeviceList = await deviceModel.getDeviceWithSchedules(time);
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
                    await adaConnect.triggerPumpSchedule(device.adaUsername, device.feedID, device.apiKey, pumpTime);
                }
                catch (error) {
                    console.log(error);
                }
            };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV2aWNlLWNvbnRyb2xsZXJzLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL2FwMS9EZXNrdG9wL1RoZXNpcy90aGVzaXNfcHJhdGljZV93YXRlcmluZ19zeXN0ZW0vQmFja2VuZC9zb3VyY2UvIiwic291cmNlcyI6WyJjb250cm9sbGVycy9kZXZpY2UtY29udHJvbGxlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxVQUFVLE1BQU0sNkJBQTZCLENBQUM7QUFDckQsT0FBTyxXQUFXLE1BQU0sb0NBQW9DLENBQUM7QUFDN0QsT0FBTyxjQUFjLE1BQU0sc0JBQXNCLENBQUM7QUFFbEQsTUFBTSxnQkFBZ0IsR0FBRztJQUNyQixLQUFLLENBQUMsWUFBWSxDQUFDLE1BQWMsRUFBRSxNQUFjLEVBQUUsSUFBWSxFQUFFLElBQVksRUFBRSxNQUFjLEVBQUUsV0FBbUI7UUFDOUcsSUFBSSxDQUFDO1lBQ0QsSUFBSSxDQUFDLENBQUMsTUFBTSxXQUFXLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQztnQkFDdkMsT0FBTztvQkFDSCxLQUFLLEVBQUUsdUJBQXVCO2lCQUNqQyxDQUFDO1lBQ04sQ0FBQztZQUVELE1BQU0sYUFBYSxHQUFHLEVBQUUsQ0FBQztZQUN6QixNQUFNLE1BQU0sR0FBRyxNQUFNLFdBQVcsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLEVBQUUsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1lBQzlILElBQUksSUFBSSxLQUFLLE1BQU0sSUFBSSxTQUFTLEtBQUssTUFBTSxFQUFFLENBQUM7Z0JBQzFDLE9BQU87b0JBQ0gsS0FBSyxFQUFFLGdCQUFnQjtpQkFDMUIsQ0FBQztZQUNOLENBQUM7WUFFRCxPQUFPO2dCQUNILE1BQU0sRUFBRSxNQUFNO2FBQ2pCLENBQUM7UUFDTixDQUFDO1FBQUMsT0FBTyxL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