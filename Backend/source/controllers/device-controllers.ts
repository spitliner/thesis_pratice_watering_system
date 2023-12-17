import adaConnect from '../cron-jobs/ada-request.js';
import deviceModel from '../database/models/device-model.js';
import dataController from './data-controller.js';


const deviceController = {
    async createDevice(deviceID: string, userID: string, name: string, type: string, apiKey: string, adaUsername: string) {
        try {
            if (!(await deviceModel.checkID(deviceID))) {
                return {
                    error: 'Device already in use',
                };
            }

            const deviceSetting = {};
            const device = await deviceModel.insertDevice(deviceID, userID, type, name, JSON.stringify(deviceSetting), apiKey, adaUsername);
            if (null === device || undefined === device) {
                return {
                    error: 'Database error',
                };
            }

            return {
                result: device,
            };
        } catch (error) {
            console.log(error);
            return {
                error: 'Server error',
            };
        }
    },

    async getDevice(deviceID: string, userID: string) {
        try {
            return await deviceModel.getDeviceData(deviceID, userID);
        } catch (error) {
            console.log(error);
            return undefined;
        }
    },

    async getUserDevice(userID: string) {
        try {
            return await deviceModel.getUserDeivceData(userID);
        } catch (error) {
            console.log(error);
            return undefined;
        }
    },

    async deleteDevice(deviceID: string, userID: string) {
        try {
            return await deviceModel.deleteDevice(deviceID, userID);
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async changeSchedule(deviceID: string, userID: string, newSchedule: string[][] | undefined) {
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
        } catch (error) {
            console.log(error);
            return {
                error: 'unexpected error',
            };
        }
    },

    async changeSettings(deviceID: string, userID: string, newSettings: Record<string, unknown>) {
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
        } catch (error) {
            console.log(error);
            return {
                error: 'unexpected error',
            };
        }
    },

    async changeType(deviceID: string, userID: string, editedType: string) {
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
            }
        } catch (error) {
            console.log(error);
            return {
                error: 'unexpected error',
            };
        }
    },

    async changeName(deviceID: string, userID: string, newName: string) {
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
            }
        } catch (error) {
            console.log(error);
            return {
                error: 'unexpected error',
            };
        }
    },

    async changeAPIkey(deviceID: string, userID: string, newKey: string, newUsername: string) {
        try {
            const result = await deviceModel.changeAPIkey(deviceID, userID, newKey, newUsername);
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
        } catch (error) {
            console.log(error);
            return {
                error: 'unexpected error',
            };
        }
    },

    async triggerDeviceSchedules(time: string) {
        try {
            const deviceList = await deviceModel.getAllSensorData();
            const actionDeviceList = await deviceModel.getDeviceWithSchedules(time);

            deviceList.forEach(async device => {
                try {
                    await dataController.insertFeed(device.id, device.userID, await adaConnect.getFeedData(device.adaUsername, device.id, device.apiKey));
                } catch (error) {
                    console.log(error);
                }
            });

            actionDeviceList.forEach(async device => {
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

                    await adaConnect.triggerPump(device.adaUsername, device.id, device.apiKey, pumpTime);
                } catch (error) {
                    console.log(error);
                }
            });
        } catch (error) {
            console.log(error);
        }
    },
};

export default deviceController;
