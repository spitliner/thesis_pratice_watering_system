import mongoose from "mongoose";

const DataSchema = new mongoose.Schema({
    id: { type: String, required: true },
    deviceID: { type: String, required: true, index: "hashed" },
    time: { type: Date, required: true },
    data: { type: String, required: true }
});

export default DataSchema;