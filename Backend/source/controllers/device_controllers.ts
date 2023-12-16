import deviceModel from "../database/models/device_model.js";


class DeviceController {
    static async createDevice(deviceID: string, userID: string, name: string, type: string, apiKey: string, adaUsername: string) {
        try {
            if (false === await deviceModel.checkID(deviceID)) {
                return {
                    "error": "Device already in use"
                }
            }
            const deviceSetting = {};
            const device =  await deviceModel.insertDevice(deviceID, userID, type, name, JSON.stringify(deviceSetting), apiKey, adaUsername);
            if (null === device || undefined === device) {
                return {
                    "error": "Database error"
                }
            }
            return {
                result: device
            }
        } catch (error) {
            console.log(error);
            return {
                "error": "Server error"
            }
        }
    }

    static async getDevice(deviceID: string, userID: string) {
        try {
            return deviceModel.getDeviceData(deviceID, userID);
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }

    static async getUserDevice(userID: string) {
        try {
            return deviceModel.getUserDeivceData(userID);
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }

    static async deleteDevice(deviceID: string, userID: string) {
        try {
            return deviceModel.deleteDevice(deviceID, userID);
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    static async changeSchedule(deviceID: string, userID: string, newSchedule:string[][] | undefined) {
        try {
            let result = null;
            if (undefined === newSchedule) {
                result = await deviceModel.removeDeviceSchedule(deviceID, userID);
            } else {
                result = await deviceModel.changeDeviceSchedule(deviceID, userID, newSchedule);
            }
            if (null === result) {
                return {
                    "error": "database error"
                };
            } else if (false === result) {
                return {
                    "error": "device not found"
                };
            }
            return {
                "result": "change save"
            }
        } catch (error) {
            console.log(error);
            return {
                "error": "unexpected error"
            };
        }
    }

    static async changeSettings(deviceID: string, userID: string, newSettings: {[key: string]: unknown}) {
        try {
            const result = await deviceModel.changeDeviceSettings(deviceID, userID, JSON.stringify(newSettings));
            if (null === result) {
                return {
                    "error": "database error"
                };
            } else if (false === result) {
                return {
                    "error": "device not found"
                };
            }
            return {
                "result": "change save"
            }
        } catch (error) {
            console.log(error);
            return {
                "error": "unexpected error"
            };
        }
    }

    static async changeType(deviceID: string, userID: string, editedType: string) {
        try {
            const result = await deviceModel.changeDeviceType(deviceID, userID, editedType);
            if (null === result) {
                return {
                    "error": "database error"
                };
            } else if (false === result) {
                return {
                    "error": "device not found"
                };
            }
            return {
                "result": "change save"
            }
        } catch (error) {
            console.log(error);
            return {
                "error": "unexpected error"
            };
        }
    }

    static async changeName(deviceID: string, userID: string, newName: string) {
        try {
            const result = await deviceModel.changeDeviceName(deviceID, userID, newName);
            if (null === result) {
                return {
                    "error": "database error"
                };
            } else if (false === result) {
                return {
                    "error": "device not found"
                };
            }
            return {
                "result": "change save"
            }
        } catch (error) {
            console.log(error);
            return {
                "error": "unexpected error"
            };
        }
    }

    static async changeAPIkey(deviceID: string, userID: string, newKey: string, newUsername: string) {
        try {
            const result = await deviceModel.changeAPIkey(deviceID, userID, newKey, newUsername);
            if (null === result) {
                return {
                    "error": "database error"
                };
            } else if (false === result) {
                return {
                    "error": "device not found"
                };
            }
            return {
                "result": "change save"
            }
        } catch (error) {
            console.log(error);
            return {
                "error": "unexpected error"
            };
        }
    }

    static async triggerDeviceSchedules(time: string) {
        try {
            const deviceList = await deviceModel.getAllSensorData();
            const actionDeviceList = await deviceModel.getDeviceWithSchedules(time);

            
        } catch (error) {
            console.log(error);
        }
    }
}

export default DeviceController;