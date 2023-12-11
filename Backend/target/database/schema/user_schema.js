import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    id: { type: String, required: true, index: { type: "hashed", unique: true } },
    email: { type: String, required: true, index: { type: "hashed", unique: true } },
    password: { type: String, required: true },
    settings: { type: String }
});
export default UserSchema;
