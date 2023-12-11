import mongoose from "mongoose";
const DeviceSchema = new mongoose.Schema({
    id: { type: String, required: true, index: { type: "hashed", unique: true } },
    userID: { type: String, required: true, index: "hashed" },
    name: { type: String, required: true },
    type: { type: String, required: true },
    apiKey: { type: String, required: true, index: { type: "hashed", unique: true } },
    schedules: { type: [String], required: false },
    settings: { type: String, required: true }
});
export default DeviceSchema;
