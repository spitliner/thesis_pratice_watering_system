import mongoose from "mongoose";

//---

import DataSchema from "../schema/data_schema.js";

//---

const DataMongoModel = mongoose.model("feed", DataSchema);

class DataModel {
    static async getData(deviceID: string) {
        return DataMongoModel.find({
            deviceID: deviceID
        }, "-__v -_id").sort("-time").lean().exec();
    }

    static async getDataWithin(deviceID: string, afterDate: Date) {
        return DataMongoModel.find({
            deviceID: deviceID,
            time: {
                $gte: afterDate
            }
        }, "-__v -_id").sort("-time").lean().exec();
    }

    static async insertData(data : [{
        id: string,
        deviceID: string,
        time: Date,
        data: string
    }]) {
        try {
            const result = await DataMongoModel.insertMany(data);
            console.log("Insert " + result.length);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    static async deleteDataByDevice(deviceID: string) {
        const result = await DataMongoModel.deleteMany({deviceID: deviceID}).lean().exec();
        return result.acknowledged;
    }
}

export default DataModel;