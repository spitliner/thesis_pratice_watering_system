import DeviceModel from "../database/models/device_model.js";
import UserModel from "../database/models/user_model.js";
import Authentication from "../middleware/auth.js";
class UserController {
    static async getUser(userID) {
        try {
            const usr = await UserModel.getUser(userID);
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
    static async changeUserSetting(userID, change) {
        try {
            if (undefined !== change.newSetting) {
                return {
                    "usr": UserModel.changeSetting(userID, change.newSetting)
                };
            }
            else if (undefined !== change.newAPIkey) {
                return {
                    "usr": UserModel.changeAPIkey(userID, change.newAPIkey)
                };
            }
            else if (undefined !== change.newEmail) {
                return {
                    "usr": UserModel.changeEmail(userID, change.newEmail)
                };
            }
            else if (undefined !== change.newPassword) {
                return {
                    "usr": UserModel.changePassword(userID, change.newPassword)
                };
            }
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
