import mongoose from "mongoose";
import { nanoid } from "nanoid";

//---

import UserSchema from "../schema/user_schema.js";
import Authentication from "../../middleware/auth.js";

//---

const UserMongoModel = mongoose.model("user", UserSchema);
const userModel = {
    async getUser(userID: string) {
        return UserMongoModel.findOne({id: userID}, "-__v").exec();
    },

    async getUserData(userID: string) {
        return UserMongoModel.findOne({id: userID}, "-_id -__v -password").lean().exec();
    },

    async searchUser(userEmail: string) {
        return UserMongoModel.findOne({
            email: userEmail
        }).select("-_id -__v").lean().exec();
    },

    /**
     * If email availible, return true, otherwise return false
     * @param userEmail email to check
     * @returns 
     */
    async checkEmail(userEmail: string) {
        return 0 === await UserMongoModel.countDocuments({
            email: userEmail
        });
    },

    async createUser(userEmail: string, password: string) {
        try {
            const result = await UserMongoModel.insertMany([{
                id: nanoid(12),
                email: userEmail,
                password: await Authentication.hashPassword(password),
                settings: "{}"
            }]);
            return result[0];
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async changeSetting(userID: string, newSetting: string) {
        try {
            const user = await userModel.getUser(userID);
            if (null === user) {
                return false;
            }
            const result = await UserMongoModel.updateOne({id: userID}, {settings: newSetting}).lean().exec();
            return result.acknowledged;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async changeEmail(userID: string, newMail: string) {
        try {
            const user = await userModel.getUser(userID);
            if (null === user) {
                return false;
            }
            const result = await UserMongoModel.updateOne({id: userID}, {email: newMail}).lean().exec();
            return result.acknowledged;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async changePassword(userID: string, newPass: string) {
        try {
            const user = await userModel.getUser(userID);
            if (null === user) {
                return false;
            }
            const result = await UserMongoModel.updateOne({id: userID}, {password: newPass}).lean().exec();
            return result.acknowledged;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
    
    async deleteUser(userID: string) {
        const result = await UserMongoModel.deleteOne({
            id: userID,
        });
        return 1 === result.deletedCount;
    }
}

export default userModel;