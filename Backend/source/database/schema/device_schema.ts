import mongoose from "mongoose";

const DeviceSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    userID: { type: String, required: true, index: "hashed" },
    name: { type: String, required: true},
    type: { type: String, required: true },
    schedules: { type: [String] },
    settings: { type: String, required: true } 
});

export default DeviceSchema;