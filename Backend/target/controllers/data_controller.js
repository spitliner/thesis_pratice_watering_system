import DataModel from "../database/models/data_model.js";
import DeviceModel from "../database/models/device_model.js";
class DataController {
    static async getData(deviceID, userID) {
        try {
            const deviceData = await DeviceModel.getDeviceData(deviceID, userID);
            if (null === deviceData) {
                return {
                    error: "Device not found"
                };
            }
            else if (userID !== deviceData.userID) {
                return {
                    error: "Device not belong to user"
                };
            }
            return DataModel.getData(deviceID);
        }
        catch (error) {
            console.log(error);
            return {
                error: "Database error"
            };
        }
    }
    static async getDataWithin(deviceID, userID, afterDate) {
        try {
            const deviceData = await DeviceModel.getDeviceData(deviceID, userID);
            if (null === deviceData) {
                return {
                    error: "Device not found"
                };
            }
            else if (userID !== deviceData.userID) {
                return {
                    error: "Device not belong to user"
                };
            }
            return DataModel.getDataWithin(deviceID, afterDate);
        }
        catch (error) {
            console.log(error);
            return {
                error: "Database error"
            };
        }
    }
    static async insertFeed(deviceID, userID, feed) {
        try {
            const deviceData = await DeviceModel.getDeviceData(deviceID, userID);
            if (null === deviceData) {
                return {
                    error: "Device not found"
                };
            }
            else if (userID !== deviceData.userID) {
                return {
                    error: "Device not belong to user"
                };
            }
            await DataModel.insertData(feed);
        }
        catch (error) {
            console.log(error);
            return {
                error: "Database error"
            };
        }
    }
}
export default DataController;
