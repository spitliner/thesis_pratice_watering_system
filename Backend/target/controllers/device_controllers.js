import DeviceModel from "../database/models/device_model.js";
class DeviceController {
    static async createDevice(deviceID, userID, name, type, apiKey) {
        try {
            if (false === await DeviceModel.checkID(deviceID)) {
                return {
                    "error": "Device already in use"
                };
            }
            const deviceSetting = {};
            const device = await DeviceModel.insertDevice(deviceID, userID, type, name, JSON.stringify(deviceSetting));
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
    }
    static async getDevice(deviceID, userID) {
        try {
            return DeviceModel.getDeviceData(deviceID, userID);
        }
        catch (error) {
            console.log(error);
            return undefined;
        }
    }
    static async deleteDevice(deviceID, userID) {
        try {
            return DeviceModel.deleteDevice(deviceID, userID);
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }
    static async changeSchedule(deviceID, userID, newSchedule) {
        try {
            const result = await DeviceModel.changeDeviceSchedule(deviceID, userID, newSchedule);
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
    }
    static async changeSettings(deviceID, userID, newSettings) {
        try {
            const result = await DeviceModel.changeDeviceSettings(deviceID, userID, JSON.stringify(newSettings));
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
    }
    static async changeType(deviceID, userID, editedType) {
        try {
            const result = await DeviceModel.changeDeviceType(deviceID, userID, editedType);
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
    }
    static async changeName(deviceID, userID, newName) {
        try {
            const result = await DeviceModel.changeDeviceName(deviceID, userID, newName);
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
    }
    static async changeAPIkey(deviceID, userID, newKey) {
        try {
            const result = await DeviceModel.changeAPIkey(deviceID, userID, newKey);
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
    }
}
export default DeviceController;
