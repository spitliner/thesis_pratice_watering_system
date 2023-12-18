import adaConnect from "../cron-jobs/ada_request.js";
import deviceModel from "../database/models/device_model.js";
import dataController from "./data_controller.js";
const deviceController = {
    async createDevice(deviceID, userID, name, type, apiKey, adaUsername) {
        try {
            if (false === await deviceModel.checkID(deviceID)) {
                return {
                    "error": "Device already in use"
                };
            }
            const deviceSetting = {};
            const device = await deviceModel.insertDevice(deviceID, userID, type, name, JSON.stringify(deviceSetting), apiKey, adaUsername);
            if (null === device || undefined === device) {
                return {
                    "error": "Database error"
                };
            }
            return {
                result: device
            };
        }
        catch (error) {
            console.log(error);
            return {
                "error": "Server error"
            };
        }
    },
    async getDevice(deviceID, userID) {
        try {
            return deviceModel.getDeviceData(deviceID, userID);
        }
        catch (error) {
            console.log(error);
            return undefined;
        }
    },
    async getUserDevice(userID) {
        try {
            return deviceModel.getUserDeivceData(userID);
        }
        catch (error) {
            console.log(error);
            return undefined;
        }
    },
    async deleteDevice(deviceID, userID) {
        try {
            return deviceModel.deleteDevice(deviceID, userID);
        }
        catch (error) {
            console.log(error);
            return null;
        }
    },
    async changeSchedule(deviceID, userID, newSchedule) {
        try {
            let result = null;
            if (undefined === newSchedule) {
                result = await deviceModel.removeDeviceSchedule(deviceID, userID);
            }
            else {
                result = await deviceModel.changeDeviceSchedule(deviceID, userID, newSchedule);
            }
            if (null === result) {
                return {
                    "error": "database error"
                };
            }
            else if (false === result) {
                return {
                    "error": "device not found"
                };
            }
            return {
                "result": "change save"
            };
        }
        catch (error) {
            console.log(error);
            return {
                "error": "unexpected error"
            };
        }
    },
    async changeSettings(deviceID, userID, newSettings) {
        try {
            const result = await deviceModel.changeDeviceSettings(deviceID, userID, JSON.stringify(newSettings));
            if (null === result) {
                return {
                    "error": "database error"
                };
            }
            else if (false === result) {
                return {
                    "error": "device not found"
                };
            }
            return {
                "result": "change save"
            };
        }
        catch (error) {
            console.log(error);
            return {
                "error": "unexpected error"
            };
        }
    },
    async changeType(deviceID, userID, editedType) {
        try {
            const result = await deviceModel.changeDeviceType(deviceID, userID, editedType);
            if (null === result) {
                return {
                    "error": "database error"
                };
            }
            else if (false === result) {
                return {
                    "error": "device not found"
                };
            }
            return {
                "result": "change save"
            };
        }
        catch (error) {
            console.log(error);
            return {
                "error": "unexpected error"
            };
        }
    },
    async changeName(deviceID, userID, newName) {
        try {
            const result = await deviceModel.changeDeviceName(deviceID, userID, newName);
            if (null === result) {
                return {
                    "error": "database error"
                };
            }
            else if (false === result) {
                return {
                    "error": "device not found"
                };
            }
            return {
                "result": "change save"
            };
        }
        catch (error) {
            console.log(error);
            return {
                "error": "unexpected error"
            };
        }
    },
    async changeAPIkey(deviceID, userID, newKey, newUsername) {
        try {
            const result = await deviceModel.changeAPIkey(deviceID, userID, newKey, newUsername);
            if (null === result) {
                return {
                    "error": "database error"
                };
            }
            else if (false === result) {
                return {
                    "error": "device not found"
                };
            }
            return {
                "result": "change save"
            };
        }
        catch (error) {
            console.log(error);
            return {
                "error": "unexpected error"
            };
        }
    },
    async triggerDeviceSchedules(time) {
        try {
            const deviceList = await deviceModel.getAllSensorData();
            const actionDeviceList = await deviceModel.getDeviceWithSchedules(time);
            deviceList.forEach(async (device) => {
                try {
                    await dataController.insertFeed(device.id, device.userID, await adaConnect.getFeedData(device.adaUsername, device.id, device.apiKey));
                }
                catch (error) {
                    console.log(error);
                }
            });
            actionDeviceList.forEach(async (device) => {
                try {
                    let pumpTime = "1";
                    if (null !== device.schedules && undefined !== device.schedules) {
                        for (let schedule of device.schedules) {
                            if (schedule[0] === time) {
                                pumpTime = schedule[1];
                                break;
                            }
                        }
                    }
                    await adaConnect.triggerPump(device.adaUsername, device.id, device.apiKey, pumpTime);
                }
                catch (error) {
                    console.log(error);
                }
            });
        }
        catch (error) {
            console.log(error);
        }
    }
};
export default deviceController;
