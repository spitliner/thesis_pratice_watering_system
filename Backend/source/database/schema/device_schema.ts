import mongoose from "mongoose";

const DeviceSchema = new mongoose.Schema({
    id: { type: String, required: true, index: { type: 1, unique: true } },
    userID: { type: String, required: true, index: 1 },
    name: { type: String, required: true},
    type: { type: String, required: true },
    apiKey: { type: String, required: true, index: { type: 1, unique: true } },
    schedules: { type: [String], required: false },
    settings: { type: String, required: true } 
});

export default DeviceSchema;