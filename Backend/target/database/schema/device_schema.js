import mongoose from "mongoose";
const DeviceSchema = new mongoose.Schema({
    id: { type: String, required: true },
    userID: { type: String, required: true, index: 1 },
    name: { type: String, required: true },
    type: { type: String, required: true },
    apiKey: { type: String, required: true },
    adaUsername: { type: String, required: true },
    settings: { type: String, required: true },
    schedules: { type: [[String]], required: false },
});
DeviceSchema.index({ id: 1, userID: 1 }, { unique: true });
export default DeviceSchema;
