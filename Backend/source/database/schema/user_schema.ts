import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    email: { type: String, required: true, index: { type: "hashed", unique: true } },
    password: { type: String, required: true },
    apiKey: { type: String, index: { type: "hashed", unique: true, sparse: true } },
    settings: { type: String, required: true } 
});

export default UserSchema;