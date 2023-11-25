import mongoose from "mongoose";
import { nanoid } from "nanoid";
//---
import UserSchema from "../schema/user_schema.js";
import Authentication from "../../middleware/auth.js";
//---
const UserMongoModel = mongoose.model("user", UserSchema);
class UserModel {
    static async getUser(userID) {
        return UserMongoModel.findById(userID).select("-__v");
    }
    static async searchUser(userEmail) {
        return UserMongoModel.findOne({
            email: userEmail
        }).select("-__v");
    }
    /**
     * If email availible, return true, otherwise return false
     * @param userEmail email to check
     * @returns
     */
    static async checkEmail(userEmail) {
        return 0 === await UserMongoModel.countDocuments({
            email: userEmail
        });
    }
    static async checkAPIkey(key) {
        return 0 !== await UserMongoModel.countDocuments({
            apiKey: key
        });
    }
    static async createUser(userEmail, password) {
        try {
            const result = await UserMongoModel.insertMany([{
                    _id: nanoid(12),
                    email: userEmail,
                    password: await Authentication.hashPassword(password),
                    settings: ""
                }]);
            return result[0];
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }
    static async changeSetting(userID, newSetting) {
        try {
            const result = await UserMongoModel.findOneAndUpdate({
                _id: userID
            }, {
                settings: JSON.stringify(newSetting)
            }, {
                "new": true
            }).select("-__v -password");
            return result;
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }
    static async changeAPIkey(userID, apiKey) {
        try {
            const result = await UserMongoModel.findOneAndUpdate({
                _id: userID
            }, {
                apiKey: apiKey
            }, {
                "new": true
            }).select("-__v -password");
            return result;
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }
    static async changeEmail(userID, newmail) {
        try {
            const result = await UserMongoModel.findOneAndUpdate({
                _id: userID
            }, {
                email: newmail
            }, {
                "new": true
            }).select("-__v -password");
            return result;
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }
    static async changePassword(userID, newPass) {
        try {
            const result = await UserMongoModel.findOneAndUpdate({
                _id: userID
            }, {
                password: await Authentication.hashPassword(newPass)
            }).select("-__v -__password");
            return result;
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }
}
export default UserModel;
