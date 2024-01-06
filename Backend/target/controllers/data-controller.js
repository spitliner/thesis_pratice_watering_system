/* eslint-disable unicorn/explicit-length-check */
import dataModel from '../database/models/data-model.js';
import deviceModel from '../database/models/device-model.js';
const dataController = {
    async getData(deviceID, userID) {
        try {
            const deviceData = await deviceModel.getDeviceData(deviceID);
            if (null === deviceData) {
                return {
                    error: 'Device not found',
                };
            }
            if (userID !== deviceData.userID) {
                return {
                    error: 'Device not belong to user',
                };
            }
            return await dataModel.getData(deviceID);
        }
        catch (error) {
            console.log(error);
            return {
                error: 'Database error',
            };
        }
    },
    async getDataWithin(deviceID, userID, afterDate) {
        try {
            const deviceData = await deviceModel.getDevice(deviceID);
            if (null === deviceData) {
                return {
                    error: 'Device not found',
                };
            }
            if (userID !== deviceData.userID) {
                return {
                    error: 'Device not belong to user',
                };
            }
            return await dataModel.getDataWithin(deviceID, afterDate);
        }
        catch (error) {
            console.log(error);
            return {
                error: 'Database error',
            };
        }
    },
    async insertFeed(deviceID, userID, feed) {
        try {
            if (0 === feed.length) {
                return {
                    error: 'No data to insert',
                };
            }
            const deviceData = await deviceModel.getDevice(deviceID);
            if (null === deviceData) {
                return {
                    error: 'Device not found',
                };
            }
            if (userID !== deviceData.userID) {
                return {
                    error: 'Device not belong to user',
                };
            }
            return {
                result: await dataModel.insertData(feed),
            };
        }
        catch (error) {
            console.log(error);
            return {
                error: 'Database error',
            };
        }
    },
};
export default dataController;
//# sourceMappingURL=data-controller.js.map