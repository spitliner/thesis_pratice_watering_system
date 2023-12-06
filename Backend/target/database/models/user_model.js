import mongoose from "mongoose";
import { nanoid } from "nanoid";
//---
import UserSchema from "../schema/user_schema.js";
import Authentication from "../../middleware/auth.js";
//---
const UserMongoModel = mongoose.model("user", UserSchema);
class UserModel {
    static async getUser(userID) {
        return UserMongoModel.findById(userID, "-__v").exec();
    }
    static async getUserData(userID) {
        return UserMongoModel.findById(userID, "-__v -password").lean().exec();
    }
    static async searchUser(userEmail) {
        return UserMongoModel.findOne({
            email: userEmail
        }).select("-__v").exec();
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
            const user = await UserModel.getUser(userID);
            if (null === user) {
                return false;
            }
            user.settings = newSetting;
            await user.save();
            return true;
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }
    static async changeAPIkey(userID, apiKey) {
        try {
            const user = await UserModel.getUser(userID);
            if (null === user) {
                return false;
            }
            user.apiKey = apiKey;
            await user.save();
            return true;
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }
    static async changeEmail(userID, newmail) {
        try {
            const user = await UserModel.getUser(userID);
            if (null === user) {
                return false;
            }
            user.email = newmail;
            await user.save();
            return true;
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }
    static async changePassword(userID, newPass) {
        try {
            const user = await UserModel.getUser(userID);
            if (null === user) {
                return false;
            }
            user.password = newPass;
            await user.save();
            return true;
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }
}
export default UserModel;
