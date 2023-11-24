import DeviceModel from "../database/models/device_model.js";


class DeviceController {
    static async getDevice(deviceID: string) {
        try {
            return DeviceModel.getDevice(deviceID);
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }

    static async changeSchedule(deviceID: string, userID: string, newSchedule: number[][]) {
        try {

        } catch (error) {
            console.log(error);

        }
    }
}

export default DeviceController;