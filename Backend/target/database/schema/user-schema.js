import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    id: { type: String, required: true, index: { type: 1, unique: true } },
    email: { type: String, required: true, index: { type: 1, unique: true } },
    password: { type: String, required: true },
    settings: { type: String },
});
export default userSchema;
//# sourceMappingURL=user-schema.js.map