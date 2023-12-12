import express from "express";
import authRequest from "../middleware/expressAuth.js";
import UserController from "../controllers/user_controller.js";
import { errors } from "jose";
import DeviceController from "../controllers/device_controllers.js";

const UserRouter = express.Router();

UserRouter.post('/account/', async (request, response) => {
    try {
        const {email, password} = request.body;
        const usr = await UserController.createUser(email, password);
        if (null === usr) {
            return response.status(500).json({
                "error": "unexpected server error"
            });
        } 
        else if (undefined !== usr.error) {
            if ("database error" === usr.error) {
                return response.status(500).json({
                    "error": "database error"
                });
            }
            return response.status(400).json(usr);
        }
        const result = await UserController.login(email, password);
        response.cookie("uid", result.uid, {
            httpOnly: true,
            sameSite: "strict"
        });
        response.cookie("tokenType", result.tokenType, {
            httpOnly: true,
            sameSite: "strict"
        });
        let usrObject = usr.usr?.toObject();
        if (undefined !== usrObject) {
            usrObject.password = "";
        }
        return response.status(201).json({"token": result.bearer_token});
    } catch (error) {
        console.log(error);
        return response.status(500).json({
            "error": "unexpected server error"
        });
    }
});

UserRouter.post('/account/email/duplicate', async (request, response) => {
    try {
        const email = String(request.body.email);
        if ("undefined" === email) {
            return response.status(400).json({
                "error": "missing info"
            });
        }
        if (await UserController.checkEmailDublication(email)) {
            return response.status(200).json({
                "result": false
            });
        }
        return response.status(200).json({
            "result": true
        });
    } catch (error) {
        console.log(error);
        return response.status(500).json({
            "error": "unexpected server error"
        });
    }
});

UserRouter.post('/account/password', async (request, response) => {
    try {
        const password = String(request.body.password);
        const userID = String(request.cookies.uid);
        if ("undefined" === password) {
            return response.status(400).json({
                "error": "missing info"
            });
        }
        const result = await UserController.changeUserData(userID, {newPassword: password});
        if (undefined !== result.error) {
            return response.status(500).json(result);
        }
        return response.status(200).json(result);
    } catch (error) {
        console.log(error);
        return response.status(500).json({
            "error": "unexpected server error"
        });
    }
});

UserRouter.post('/account/email', async (request, response) => {
    try {
        const email = String(request.body.email);
        const userID = String(request.cookies.uid);
        if ("undefined" === email) {
            return response.status(400).json({
                "error": "missing info"
            });
        }
        if (!(await UserController.checkEmailDublication(email))) {
            return response.status(400).json({
                "error": "email already in use"
            })
        }
        const result = await UserController.changeUserData(userID, {newEmail: email});
        if (undefined !== result.error) {
            return response.status(500).json(result);
        }
        return response.status(200).json(result);
    } catch (error) {
        console.log(error);
        return response.status(500).json({
            "error": "unexpected server error"
        });
    }
});

UserRouter.post('/account/settings', async (request, response) => {
    try {
        const settings : {[key: string]: unknown} = request.body.settings;
        const userID = String(request.cookies.uid);
        if (undefined === settings) {
            return response.status(400).json({
                "error": "missing info"
            });
        }
        const result = await UserController.changeUserData(userID, {newSetting: settings});
        if (undefined !== result.error) {
            return response.status(500).json(result);
        }
        return response.status(200).json(result);
    } catch (error) {
        console.log(error);
        return response.status(500).json({
            "error": "unexpected server error"
        });
    }
});

UserRouter.get('/user/', authRequest, async (request, response) => {
    try {
        const userID = request.cookies["uid"];
        if (undefined === userID) {
            return response.status(400).json({"error": "missing info"});
        }
        const usr = await UserController.getUser(userID);
        if (undefined !== usr.error) {
            if ("database error" === usr.error) {
                return response.status(500).json({
                    "error": "database error"
                });
            }
            return response.status(400).json(usr);
        }
        return response.status(200).json({"usr": usr.usr});
    } catch (error) {
        console.log(error);
        return response.status(500).json({
            "error": "unexpected server error"
        });
    }
});

UserRouter.post('/user/device', authRequest, async (request, response) => {
    try {
        const userID: string = request.cookies["uid"];
        
        const {deviceID, name, type, apiKey} = request.body;

        const result = await DeviceController.createDevice(deviceID, userID, name, type, apiKey);

        if (undefined !== result.error) {
            if ("Device already in use" === result.error) {
                return response.status(409).json(result);
            }

            return response.status(500).json(result);
        }

        return response.status(201).json(result);
    } catch (error) {
        console.log(error);
        return response.status(500).json({
            "error": "unexpected server error"
        });
    }
});

UserRouter.get('/user/device', authRequest, async (request, response) => {
    try {
        const userID: string = request.cookies["uid"];
        
        const result = await DeviceController.getUserDevice(userID);

        if (undefined === result) {
            return response.status(500).json({
                "error": "unexpected server error"
            });
        }

        return response.status(201).json(result);
    } catch (error) {
        console.log(error);
        return response.status(500).json({
            "error": "unexpected server error"
        });
    }
});


UserRouter.post('/login/', async (request, response) => {
    try {
        const {email, password} = request.body;
        if (undefined === email || undefined === password) {
            return response.status(401).json({"error": "missing info"});
        }
        const result = await UserController.login(email, password);
        if (undefined !== result["error"]) {
            return response.status(401).json(result);
        }
        response.cookie("uid", result.uid, {
            httpOnly: true,
            sameSite: "strict"
        });
        response.cookie("tokenType", result.tokenType, {
            httpOnly: true,
            sameSite: "strict"
        });
        return response.status(200).json({"token": result.bearer_token});
    } catch (error) {
        console.log(error);
        return response.status(500).json({
            "error": "unexpected server error"
        });
    }
});

UserRouter.post('/account/delete', authRequest, async (request, response) => {
    try {
        const userID: string = request.cookies["uid"];

        const result = await UserController.deleteUser(userID);

        return response.status(200).json({result : result});
    } catch (error) {
        console.log(error);
        return response.status(500).json({
            "error": "unexpected server error"
        });
    }
});


export default UserRouter;