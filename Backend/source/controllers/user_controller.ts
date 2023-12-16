import deviceModel from "../database/models/device_model.js";
import userModel from "../database/models/user_model.js";
import Authentication from "../middleware/auth.js";


class UserController {
    static async getUser(userID: string) {
        try {
            const usr = await userModel.getUserData(userID);
            if (null === usr) {
                return {
                    "error": "user not found"
                }
            }
            return {
                "usr": usr
            }
        } catch (error) {
            console.log(error);
            return {
                "error": "database error"
            }
        }
    }

    static async login(email: string, password: string) {
        const usr = await userModel.searchUser(email);
        if (null === usr) {
            return {
                "error": "user not found"
            }
        }
        if (!(await Authentication.verifyPassword(password, usr.password))) {
            return {
                "error": "wrong password"
            }
        }
        return {
            "bearer_token": await Authentication.createToken({
                "uid": usr.id
            }),
            "uid": usr.id,
            "tokenType": "jwt"
        }
    }

    static checkPasswordLength(password: string) {
        return 12 < password.length;
    }

    static checkEmailDublication(email: string) {
        return userModel.checkEmail(email);
    }

    static async createUser(email: string, password: string) {
        try {
            if (!this.checkPasswordLength(password)) {
                return {
                    "error": "weak password"
                }
            }
            if (!userModel.checkEmail(email)) {
                return {
                    "error": "dublicate email"
                }
            }
            const usr = await userModel.createUser(email, password);
            return {
                "usr": usr
            };
        } catch (error) {
            console.log(error);
            return {
                "error": "database error"
            }
        }
        
    }

    static async getUserDevice(userID: string) {
        const result = await deviceModel.getUserDeivceData(userID);
        return result;
    }

    static async getDailyReport(userID: string) {

    }

    static async changeUserData(userID: string, change: {
        newSetting?: {[key: string]: unknown},
        newEmail?: string,
        newPassword?: string
    }) {
        try {
            let result = {};
            let resultChange : boolean | null = null;
            if (undefined !== change.newSetting) {
                resultChange = await userModel.changeSetting(userID, JSON.stringify(change.newSetting))
            }
            if (undefined !== change.newEmail) {
                resultChange = await userModel.changeEmail(userID, change.newEmail);
            }
            if (undefined !== change.newPassword) {
                resultChange = await userModel.changePassword(userID, await Authentication.hashPassword(change.newPassword))
            }
            if (null === resultChange) {
                return {
                    "error": "database error"
                }
            } else if (false === resultChange) {
                return {
                    "error": "user not found"
                }
            }
            return {
                "result": "change saved"
            }
        } catch (error) {
            console.log(error);
            return {
                "error": "database error"
            }
        }
    }

    static async deleteUser(userID: string) {
        deviceModel.deleteUserDevice(userID);
        const result = await userModel.deleteUser(userID);
        return result;
    }

    
}

export default UserController;