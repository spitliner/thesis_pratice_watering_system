import mongoose from "mongoose";
import { nanoid } from "nanoid";

//---

import UserSchema from "../schema/user_schema.js";
import Authentication from "../../middleware/auth.js";

//---

const UserMongoModel = mongoose.model("user", UserSchema);
class UserModel {
    static async getUser(userID: string) {
        return UserMongoModel.findOne({id: userID}, "-_id -__v").exec();
    }

    static async getUserData(userID: string) {
        return UserMongoModel.findOne({id: userID}, "-_id -__v -password").lean().exec();
    }

    static async searchUser(userEmail: string) {
        return UserMongoModel.findOne({
            email: userEmail
        }).select("-_id -__v").exec();
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

    static async createUser(userEmail: string, password: string) {
        try {
            const result = await UserMongoModel.insertMany([{
                _id: nanoid(12),
                email: userEmail,
                password: await Authentication.hashPassword(password),
                settings: "{}"
            }]);
            return result[0];
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    static async changeSetting(userID: string, newSetting: string) {
        try {
            const user = await UserModel.getUser(userID);
            if (null === user) {
                return false;
            }
            user.settings = newSetting;
            await user.save();
            return user.settings === newSetting;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    static async changeEmail(userID: string, newMail: string) {
        try {
            const user = await UserModel.getUser(userID);
            if (null === user) {
                return false;
            }
            user.email = newMail;
            await user.save();
            return user.email === newMail;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    static async changePassword(userID: string, newPass: string) {
        try {
            const user = await UserModel.getUser(userID);
            if (null === user) {
                return false;
            }
            user.password = newPass;
            await user.save();
            return user.password === newPass;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    
    static async deleteUser(userID: string) {
        const result = await UserMongoModel.deleteOne({
            id: userID,
        });
        return 1 === result.deletedCount;
    }
}

export default UserModel;