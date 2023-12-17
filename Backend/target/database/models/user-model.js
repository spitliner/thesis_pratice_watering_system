import mongoose from 'mongoose';
import { nanoid } from 'nanoid';
import userSchema from '../schema/user-schema.js';
import authentication from '../../middleware/auth.js';
//---
const userMongoModel = mongoose.model('user', userSchema);
const userModel = {
    async getUser(userID) {
        return userMongoModel.findOne({ id: userID }, '-__v').exec();
    },
    async getUserData(userID) {
        return userMongoModel.findOne({ id: userID }, '-_id -__v -password').lean().exec();
    },
    async searchUser(userEmail) {
        return userMongoModel.findOne({
            email: userEmail,
        }).select('-_id -__v').lean().exec();
    },
    /**
     * If email availible, return true, otherwise return false
     * @param userEmail email to check
     * @returns
     */
    async checkEmail(userEmail) {
        return 0 === await userMongoModel.countDocuments({
            email: userEmail,
        });
    },
    async createUser(userEmail, password) {
        try {
            const result = await userMongoModel.insertMany([{
                    id: nanoid(12),
                    email: userEmail,
                    password: await authentication.hashPassword(password),
                    settings: '{}',
                }]);
            return result[0];
        }
        catch (error) {
            console.log(error);
            return null;
        }
    },
    async changeSetting(userID, newSetting) {
        try {
            const user = await userModel.getUser(userID);
            if (null === user) {
                return false;
            }
            const result = await userMongoModel.updateOne({ id: userID }, { settings: newSetting }).lean().exec();
            return result.acknowledged;
        }
        catch (error) {
            console.log(error);
            return null;
        }
    },
    async changeEmail(userID, newMail) {
        try {
            const user = await userModel.getUser(userID);
            if (null === user) {
                return false;
            }
            const result = await userMongoModel.updateOne({ id: userID }, { email: newMail }).lean().exec();
            return result.acknowledged;
        }
        catch (error) {
            console.log(error);
            return null;
        }
    },
    async changePassword(userID, newPass) {
        try {
            const user = await userModel.getUser(userID);
            if (null === user) {
                return false;
            }
            const result = await userMongoModel.updateOne({ id: userID }, { password: newPass }).lean().exec();
            return result.acknowledged;
        }
        catch (error) {
            console.log(error);
            return null;
        }
    },
    async deleteUser(userID) {
        const result = await userMongoModel.deleteOne({
            id: userID,
        });
        return 1 === result.deletedCount;
    },
};
export default userModel;
