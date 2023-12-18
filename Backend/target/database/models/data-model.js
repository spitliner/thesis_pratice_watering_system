import mongoose from 'mongoose';
import dataSchema from '../schema/data-schema.js';
//---
const dataMongoModel = mongoose.model('feed', dataSchema);
const dataModel = {
    async getData(deviceID) {
        return dataMongoModel.find({
            deviceID: deviceID,
        }, '-__v -_id').sort('-time').lean().exec();
    },
    async getDataWithin(deviceID, afterDate) {
        return dataMongoModel.find({
            deviceID: deviceID,
            time: {
                $gte: afterDate,
            },
        }, '-__v -_id').sort('-time').lean().exec();
    },
    async insertData(data) {
        try {
            const bulkUpsert = data.map(doc => ({
                updateOne: {
                    filter: { id: doc.id },
                    update: { $setOnInsert: doc },
                    upsert: true,
                },
            }));
            const result = await dataMongoModel.bulkWrite(bulkUpsert);
            console.log('Insert ' + result.upsertedCount + ' for device with id ' + data[0].id);
            return !result.hasWriteErrors();
        }
        catch (error) {
            console.log(error);
            return false;
        }
    },
    async deleteDataByDevice(deviceID) {
        const result = await dataMongoModel.deleteMany({ deviceID: deviceID }).lean().exec();
        return result.acknowledged;
    },
};
export default dataModel;
