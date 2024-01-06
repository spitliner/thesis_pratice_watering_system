/* eslint-disable @typescript-eslint/naming-convention */
import mongoose from 'mongoose';
const dataSchema = new mongoose.Schema({
    id: { type: String, required: true },
    deviceID: { type: String, required: true, index: 1 },
    time: { type: Date, required: true },
    data: { type: String, required: true },
});
export default dataSchema;
//# sourceMappingURL=data-schema.js.map