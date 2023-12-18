import deviceModel from '../database/models/device-model.js';
import userModel from '../database/models/user-model.js';
import authentication from '../middleware/auth.js';
const userController = {
    async getUser(userID) {
        try {
            const usr = await userModel.getUserData(userID);
            if (null === usr) {
                return {
                    error: 'user not found',
                };
            }
            return {
                usr,
            };
        }
        catch (error) {
            console.log(error);
            return {
                error: 'database error',
            };
        }
    },
    async login(email, password) {
        const usr = await userModel.searchUser(email);
        if (null === usr) {
            return {
                error: 'user not found',
            };
        }
        if (!(await authentication.verifyPassword(password, usr.password))) {
            return {
                error: 'wrong password',
            };
        }
        return {
            bearerToken: await authentication.createToken({
                uid: usr.id,
            }),
            uid: usr.id,
            tokenType: 'jwt',
        };
    },
    checkPasswordLength(password) {
        return 12 < password.length;
    },
    async checkEmailDublication(email) {
        return userModel.checkEmail(email);
    },
    async createUser(email, password) {
        try {
            if (!this.checkPasswordLength(password)) {
                return {
                    error: 'weak password',
                };
            }
            if (!(await userModel.checkEmail(email))) {
                return {
                    error: 'dublicate email',
                };
            }
            const usr = await userModel.createUser(email, password);
            return {
                usr,
            };
        }
        catch (error) {
            console.log(error);
            return {
                error: 'database error',
            };
        }
    },
    async getUserDevice(userID) {
        const result = await deviceModel.getUserDeivceData(userID);
        return result;
    },
    async changeUserData(userID, change) {
        try {
            let resultChange;
            if (undefined !== change.newSetting) {
                resultChange = await userModel.changeSetting(userID, JSON.stringify(change.newSetting));
            }
            if (undefined !== change.newEmail) {
                resultChange = await userModel.changeEmail(userID, change.newEmail);
            }
            if (undefined !== change.newPassword) {
                resultChange = await userModel.changePassword(userID, await authentication.hashPassword(change.newPassword));
            }
            if (undefined === resultChange) {
                return {
                    error: 'database error',
                };
            }
            if (!resultChange) {
                return {
                    error: 'user not found',
                };
            }
            return {
                result: 'change saved',
            };
        }
        catch (error) {
            console.log(error);
            return {
                error: 'database error',
            };
        }
    },
    async deleteUser(userID) {
        await deviceModel.deleteUserDevice(userID);
        const result = await userModel.deleteUser(userID);
        return result;
    },
};
export default userController;
