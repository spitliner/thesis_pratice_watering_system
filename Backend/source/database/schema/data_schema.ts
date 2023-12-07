import mongoose from "mongoose";

const DataSchema = new mongoose.Schema({
    id: { type: String, required: true, index: { type: "hashed", unique: true } },
    deviceID: { type: String, required: true },
    time: { type: Date, required: true },
    data: { type: String, required: true }
});

export default DataSchema;