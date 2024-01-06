/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/naming-convention */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9hcDEvRGVza3RvcC9UaGVzaXMvdGhlc2lzX3ByYXRpY2Vfd2F0ZXJpbmdfc3lzdGVtL0JhY2tlbmQvc291cmNlLyIsInNvdXJjZXMiOlsiZGF0YWJhc2UvbW9kZWxzL2RhdGEtbW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEscUNBQXFDO0FBQ3JDLHlEQUF5RDtBQUN6RCxPQUFPLFFBQVEsTUFBTSxVQUFVLENBQUM7QUFDaEMsT0FBTyxVQUFVLE1BQU0sMEJBQTBCLENBQUM7QUFFbEQsS0FBSztBQUVMLE1BQU0sY0FBYyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBRTFELE1BQU0sU0FBUyxHQUFHO0lBQ2QsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFnQjtRQUMxQixPQUFPLGNBQWMsQ0FBQyxJQUFJLENBQUM7WUFDdkIsUUFBUSxFQUFFLFFBQVE7U0FDckIsRUFBRSxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDaEQsQ0FBQztJQUVELEtBQUssQ0FBQyxhQUFhLENBQUMsUUFBZ0IsRUFBRSxTQUFlO1FBQ2pELE9BQU8sY0FBYyxDQUFDLElBQUksQ0FBQztZQUN2QixRQUFRLEVBQUUsUUFBUTtZQUNsQixJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLFNBQVM7YUFDbEI7U0FDSixFQUFFLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNoRCxDQUFDO0lBRUQsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUtmO1FBQ0UsSUFBSSxDQUFDO1lBQ0QsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ2hDLFNBQVMsRUFBRTtvQkFDUCxNQUFNLEVBQUUsRUFBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBQztvQkFDcEIsTUFBTSxFQUFFLEVBQUMsWUFBWSxFQUFFLEdBQUcsRUFBQztvQkFDM0IsTUFBTSxFQUFFLElBQUk7aUJBQ2Y7YUFDSixDQUFDLENBQUMsQ0FBQztZQUNKLE1BQU0sTUFBTSxHQUFHLE1BQU0sY0FBYyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUMxRCxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsYUFBYSxHQUFHLHNCQUFzQixHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNwRixPQUFPLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3BDLENBQUM7UUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1lBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNuQixPQUFPLEtBQUssQ0FBQztRQUNqQixDQUFDO0lBQ0wsQ0FBQztJQUVELEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxRQUFnQjtRQUNyQyxNQUFNLE1BQU0sR0FBRyxNQUFNLGNBQWMsQ0FBQyxVQUFVLENBQUMsRUFBQyxRQUFRLEVBQUUsUUFBUSxFQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNuRixPQUFPLE1BQU0sQ0FBQyxZQUFZLENBQUM7SUFDL0IsQ0FBQztDQUNKLENBQUM7QUFFRixlQUFlLFNBQVMsQ0FBQyJ9