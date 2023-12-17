import dataModel from "../database/models/data-model.js";
import deviceModel from "../database/models/device-model.js";


const dataController = {
    async getData(deviceID: string, userID: string) {
        try {
            const deviceData = await deviceModel.getDeviceData(deviceID, userID);
            if (null === deviceData) {
                return {
                    error: "Device not found"
                }
            } else if (userID !== deviceData.userID) {
                return {
                    error: "Device not belong to user"
                }
            }

            return dataModel.getData(deviceID);
        } catch (error) {
            console.log(error);
            return {
                error: "Database error"
            }
        }
    },

    async getDataWithin(deviceID: string, userID: string, afterDate: Date) {
        try {
            const deviceData = await deviceModel.getDevice(deviceID);
            if (null === deviceData) {
                return {
                    error: "Device not found"
                }
            } else if (userID !== deviceData.userID) {
                return {
                    error: "Device not belong to user"
                }
            }

            return dataModel.getDataWithin(deviceID, afterDate);
        } catch (error) {
            console.log(error);
            return {
                error: "Database error"
            }
        }
    },

    async insertFeed(deviceID: string, userID: string, feed: {id: string, deviceID: string, time: Date, data: string}[]) {
        try {
            const deviceData = await deviceModel.getDevice(deviceID);
            //console.log(deviceData);
            if (null === deviceData) {
                return {
                    error: "Device not found"
                }
            } else if (userID !== deviceData.userID) {
                return {
                    error: "Device not belong to user"
                }
            }

            return await dataModel.insertData(feed);
        } catch (error) {
            console.log(error);
            return {
                error: "Database error"
            }
        }
    }
    
}

export default dataController;