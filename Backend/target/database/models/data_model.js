import mongoose from "mongoose";
//---
import DataSchema from "../schema/data_schema.js";
//---
const DataMongoModel = mongoose.model("feed", DataSchema);
class DataModel {
    static async getData(deviceID) {
        return DataMongoModel.find({
            deviceID: deviceID
        }).select("-__v").sort("-time");
    }
    static async getDataWithin(deviceID, afterDate) {
        return DataMongoModel.find({
            deviceID: deviceID,
            time: {
                $gte: afterDate
            }
        }).select("-__v").sort("-time");
    }
    static async insertData(data) {
        try {
            const result = await DataMongoModel.insertMany(data);
            console.log("Insert " + result.length);
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
    static async checkID(idList) {
        return DataMongoModel.find({
            id: idList
        }).select("-__v");
    }
    static async deleteDataByDevice(deviceID) {
    }
}
export default DataModel;
