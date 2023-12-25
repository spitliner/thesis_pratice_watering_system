/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/naming-convention */
import mongoose from 'mongoose';
import dataSchema from '../schema/data-schema.js';

//---

const dataMongoModel = mongoose.model('feed', dataSchema);

const dataModel = {
    async getData(deviceID: string) {
        return dataMongoModel.find({
            deviceID: deviceID,
        }, '-__v -_id').sort('-time').lean().exec();
    },

    async getDataWithin(deviceID: string, afterDate: Date) {
        return dataMongoModel.find({
            deviceID: deviceID,
            time: {
                $gte: afterDate,
            },
        }, '-__v -_id').sort('-time').lean().exec();
    },

    async insertData(data: Array<{
        id: string;
        deviceID: string;
        time: Date;
        data: string;
    }>) {
        try {
            const bulkUpsert = data.map(doc => ({
                updateOne: {
                    filter: {id: doc.id},
                    update: {$setOnInsert: doc},
                    upsert: true,
                },
            }));
            const result = await dataMongoModel.bulkWrite(bulkUpsert);
            console.log('Insert ' + result.upsertedCount + ' for device with id ' + data[0].id);
            return !result.hasWriteErrors();
        } catch (error) {
            console.log(error);
            return false;
        }
    },

    async deleteDataByDevice(deviceID: string) {
        const result = await dataMongoModel.deleteMany({deviceID: deviceID}).lean().exec();
        return result.acknowledged;
    },
};

export default dataModel;
