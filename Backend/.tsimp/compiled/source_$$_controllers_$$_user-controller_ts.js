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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL2FwMS9EZXNrdG9wL1RoZXNpcy90aGVzaXNfcHJhdGljZV93YXRlcmluZ19zeXN0ZW0vQmFja2VuZC9zb3VyY2UvIiwic291cmNlcyI6WyJjb250cm9sbGVycy91c2VyLWNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxXQUFXLE1BQU0sb0NBQW9DLENBQUM7QUFDN0QsT0FBTyxTQUFTLE1BQU0sa0NBQWtDLENBQUM7QUFDekQsT0FBTyxjQUFjLE1BQU0sdUJBQXVCLENBQUM7QUFFbkQsTUFBTSxjQUFjLEdBQUc7SUFDbkIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFjO1FBQ3hCLElBQUksQ0FBQztZQUNELE1BQU0sR0FBRyxHQUFHLE1BQU0sU0FBUyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNoRCxJQUFJLElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQztnQkFDZixPQUFPO29CQUNILEtBQUssRUFBRSxnQkFBZ0I7aUJBQzFCLENBQUM7WUFDTixDQUFDO1lBRUQsT0FBTztnQkFDSCxHQUFHO2FBQ04sQ0FBQztRQUNOLENBQUM7UUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1lBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNuQixPQUFPO2dCQUNILEtBQUssRUFBRSxnQkFBZ0I7YUFDMUIsQ0FBQztRQUNOLENBQUM7SUFDTCxDQUFDO0lBRUQsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFhLEVBQUUsUUFBZ0I7UUFDdkMsTUFBTSxHQUFHLEdBQUcsTUFBTSxTQUFTLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzlDLElBQUksSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO1lBQ2YsT0FBTztnQkFDSCxLQUFLLEVBQUUsZ0JBQWdCO2FBQzFCLENBQUM7UUFDTixDQUFDO1FBRUQsSUFBSSxDQUFDLENBQUMsTUFB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