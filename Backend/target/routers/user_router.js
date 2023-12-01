import express from "express";
import authRequest from "../middleware/expressAuth.js";
import UserController from "../controllers/user_controller.js";
const UserRouter = express.Router();
UserRouter.post('/account/', async (request, response) => {
    try {
        const { email, password } = request.body;
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
        return response.status(200).json({ "token": result.bearer_token });
    }
    catch (error) {
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
            return response.status(400).json({ "error": "missing info" });
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
        let usrObject = usr.usr?.toObject();
        if (undefined !== usrObject) {
            usrObject.password = "";
        }
        return response.status(200).json({ "usr": usrObject });
    }
    catch (error) {
        console.log(error);
        return response.status(500).json({
            "error": "unexpected server error"
        });
    }
});
UserRouter.post('/login/', async (request, response) => {
    try {
        const { email, password } = request.body;
        if (undefined === email || undefined === password) {
            return response.status(401).json({ "error": "missing info" });
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
        return response.status(200).json({ "token": result.bearer_token });
    }
    catch (error) {
        console.log(error);
        return response.status(500).json({
            "error": "unexpected server error"
        });
    }
});
export default UserRouter;
