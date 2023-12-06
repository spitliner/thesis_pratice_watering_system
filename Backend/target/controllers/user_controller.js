import DeviceModel from "../database/models/device_model.js";
import UserModel from "../database/models/user_model.js";
import Authentication from "../middleware/auth.js";
class UserController {
    static async getUser(userID) {
        try {
            const usr = await UserModel.getUserData(userID);
            if (null === usr) {
                return {
                    "error": "user not found"
                };
            }
            return {
                "usr": usr
            };
        }
        catch (error) {
            console.log(error);
            return {
                "error": "database error"
            };
        }
    }
    static async login(email, password) {
        const usr = await UserModel.searchUser(email);
        if (null === usr) {
            return {
                "error": "user not found"
            };
        }
        if (!(await Authentication.verifyPassword(password, usr.password))) {
            return {
                "error": "wrong password"
            };
        }
        return {
            "bearer_token": await Authentication.createToken({
                "uid": usr._id
            }),
            "uid": usr._id,
            "tokenType": "jwt"
        };
    }
    static checkPasswordLength(password) {
        return 12 < password.length;
    }
    static checkEmailDublication(email) {
        return UserModel.checkEmail(email);
    }
    static checkAPIkeylDublication(apiKey) {
        return UserModel.checkAPIkey(apiKey);
    }
    static async createUser(email, password) {
        try {
            if (!this.checkPasswordLength(password)) {
                return {
                    "error": "weak password"
                };
            }
            if (!UserModel.checkEmail(email)) {
                return {
                    "error": "dublicate email"
                };
            }
            const usr = await UserModel.createUser(email, password);
            return {
                "usr": usr
            };
        }
        catch (error) {
            console.log(error);
            return {
                "error": "database error"
            };
        }
    }
    static async getUserDevice(userID) {
        const result = await DeviceModel.getUserDeivce(userID);
        return result;
    }
    static async getDailyReport(userID) {
    }
    static async changeUserData(userID, change) {
        try {
            let result = {};
            let resultChange = null;
            if (undefined !== change.newSetting) {
                resultChange = await UserModel.changeSetting(userID, JSON.stringify(change.newSetting));
            }
            if (undefined !== change.newAPIkey) {
                resultChange = await UserModel.changeAPIkey(userID, change.newAPIkey);
            }
            if (undefined !== change.newEmail) {
                resultChange = await UserModel.changeEmail(userID, change.newEmail);
            }
            if (undefined !== change.newPassword) {
                resultChange = await UserModel.changePassword(userID, await Authentication.hashPassword(change.newPassword));
            }
            if (null === resultChange) {
                return {
                    "error": "database error"
                };
            }
            else if (false === resultChange) {
                return {
                    "error": "user not found"
                };
            }
            return {
                "result": "change saved"
            };
        }
        catch (error) {
            console.log(error);
            return {
                "error": "database error"
            };
        }
    }
}
export default UserController;
