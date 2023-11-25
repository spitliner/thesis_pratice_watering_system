import mongoose from "mongoose";
import { nanoid } from "nanoid";

//---

import UserSchema from "../schema/user_schema.js";
import Authentication from "../../middleware/auth.js";

//---

const UserMongoModel = mongoose.model("user", UserSchema);
class UserModel {
    static async getUser(userID: string) {
        return UserMongoModel.findById(userID).select("-__v");
    }

    static async searchUser(userEmail: string) {
        return UserMongoModel.findOne({
            email: userEmail
        }).select("-__v");
    }

    /**
     * If email availible, return true, otherwise return false
     * @param userEmail email to check
     * @returns 
     */
    static async checkEmail(userEmail: string) {
        return 0 === await UserMongoModel.countDocuments({
            email: userEmail
        });
    }

    static async checkAPIkey(key: string) {
        return 0 !== await UserMongoModel.countDocuments({
            apiKey: key
        });
    }

    static async createUser(userEmail: string, password: string) {
        try {
            const result = await UserMongoModel.insertMany([{
                _id: nanoid(12),
                email: userEmail,
                password: await Authentication.hashPassword(password),
                settings: ""
            }]);
            return result[0];
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    static async changeSetting(userID: string, newSetting: {[key: string]: unknown}) {
        try {
            const result = await UserMongoModel.findOneAndUpdate(
                {
                    _id: userID
                }, {
                    settings: JSON.stringify(newSetting)
                }, {
                    "new": true
                }
            ).select("-__v -password");
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    static async changeAPIkey(userID: string, apiKey: string) {
        try {
            const result = await UserMongoModel.findOneAndUpdate(
                {
                    _id: userID
                }, {
                    apiKey: apiKey
                }, {
                    "new": true
                }
            ).select("-__v -password");
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    static async changeEmail(userID: string, newmail: string) {
        try {
            const result = await UserMongoModel.findOneAndUpdate(
                {
                    _id: userID
                }, {
                    email: newmail
                }, {
                    "new": true
                }
            ).select("-__v -password");
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    static async changePassword(userID: string, newPass: string) {
        try {
            const result = await UserMongoModel.findOneAndUpdate(
                {
                    _id: userID
                }, {
                    password: await Authentication.hashPassword(newPass)
                }).select("-__v -__password");
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}

export default UserModel;