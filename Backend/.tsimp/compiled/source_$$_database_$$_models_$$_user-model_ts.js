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
            return undefined;
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
            return undefined;
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
            return undefined;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9hcDEvRGVza3RvcC9UaGVzaXMvdGhlc2lzX3ByYXRpY2Vfd2F0ZXJpbmdfc3lzdGVtL0JhY2tlbmQvc291cmNlLyIsInNvdXJjZXMiOlsiZGF0YWJhc2UvbW9kZWxzL3VzZXItbW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxRQUFRLE1BQU0sVUFBVSxDQUFDO0FBQ2hDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxRQUFRLENBQUM7QUFDOUIsT0FBTyxVQUFVLE1BQU0sMEJBQTBCLENBQUM7QUFDbEQsT0FBTyxjQUFjLE1BQU0sMEJBQTBCLENBQUM7QUFFdEQsS0FBSztBQUVMLE1BQU0sY0FBYyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQzFELE1BQU0sU0FBUyxHQUFHO0lBQ2QsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFjO1FBQ3hCLE9BQU8sY0FBYyxDQUFDLE9BQU8sQ0FBQyxFQUFDLEVBQUUsRUFBRSxNQUFNLEVBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMvRCxDQUFDO0lBRUQsS0FBSyxDQUFDLFdBQVcsQ0FBQyxNQUFjO1FBQzVCLE9BQU8sY0FBYyxDQUFDLE9BQU8sQ0FBQyxFQUFDLEVBQUUsRUFBRSxNQUFNLEVBQUMsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3JGLENBQUM7SUFFRCxLQUFLLENBQUMsVUFBVSxDQUFDLFNBQWlCO1FBQzlCLE9BQU8sY0FBYyxDQUFDLE9BQU8sQ0FBQztZQUMxQixLQUFLLEVBQUUsU0FBUztTQUNuQixDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3pDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsS0FBSyxDQUFDLFVB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