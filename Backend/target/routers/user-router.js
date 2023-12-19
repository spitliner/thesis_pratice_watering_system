/* eslint-disable @typescript-eslint/naming-convention */
import express from 'express';
import typia from 'typia';
import authRequest from '../middleware/express-auth.js';
import userController from '../controllers/user-controller.js';
import deviceController from '../controllers/device-controllers.js';
const userRouter = express.Router(); // eslint-disable-line new-cap
userRouter.post('/account/', async (request, response) => {
    try {
        const email = request.body.email;
        const password = request.body.password;
        if (!(input => {
            return "string" === typeof input;
        })(email) || !(input => {
            return "string" === typeof input;
        })(password)) {
            return response.status(400).json({
                error: 'missing information',
            });
        }
        const usr = await userController.createUser(email, password);
        if (null === usr) {
            return response.status(500).json({
                error: 'unexpected server error',
            });
        }
        if (undefined !== usr.error) {
            if ('database error' === usr.error) {
                return response.status(500).json({
                    error: 'database error',
                });
            }
            return response.status(400).json(usr);
        }
        const result = await userController.login(email, password);
        response.cookie('uid', result.uid, {
            httpOnly: true,
            sameSite: 'strict',
        });
        response.cookie('tokenType', result.tokenType, {
            httpOnly: true,
            sameSite: 'strict',
        });
        return response.status(201).json({ token: result.bearerToken });
    }
    catch (error) {
        console.log(error);
        return response.status(500).json({
            error: 'unexpected server error',
        });
    }
});
userRouter.post('/account/email/duplicate', async (request, response) => {
    try {
        const email = request.body.email;
        if (!(input => {
            return "string" === typeof input;
        })(email)) {
            return response.status(400).json({
                error: 'missing info',
            });
        }
        if (await userController.checkEmailDublication(email)) {
            return response.status(200).json({
                result: false,
            });
        }
        return response.status(200).json({
            result: true,
        });
    }
    catch (error) {
        console.log(error);
        return response.status(500).json({
            error: 'unexpected server error',
        });
    }
});
userRouter.post('/account/password', async (request, response) => {
    try {
        const password = request.body.password;
        const userID = request.cookies.uid;
        if (!(input => {
            return "string" === typeof input;
        })(userID) || !(input => {
            return "string" === typeof input;
        })(password)) {
            return response.status(401).json({ error: 'missing info' });
        }
        const result = await userController.changeUserData(userID, { newPassword: password });
        if (undefined !== result.error) {
            return response.status(500).json(result);
        }
        return response.status(200).json(result);
    }
    catch (error) {
        console.log(error);
        return response.status(500).json({
            error: 'unexpected server error',
        });
    }
});
userRouter.post('/account/email', async (request, response) => {
    try {
        const email = request.body.email;
        const userID = request.cookies.uid;
        if (!(input => {
            return "string" === typeof input;
        })(userID) || !(input => {
            return "string" === typeof input;
        })(email)) {
            return response.status(401).json({ error: 'missing info' });
        }
        if (!(await userController.checkEmailDublication(email))) {
            return response.status(400).json({
                error: 'email already in use',
            });
        }
        const result = await userController.changeUserData(userID, { newEmail: email });
        if (undefined !== result.error) {
            return response.status(500).json(result);
        }
        return response.status(200).json(result);
    }
    catch (error) {
        console.log(error);
        return response.status(500).json({
            error: 'unexpected server error',
        });
    }
});
userRouter.post('/account/settings', async (request, response) => {
    try {
        const settings = request.body.settings;
        const userID = request.cookies.uid;
        if (!(input => {
            return "string" === typeof input;
        })(userID) || !(input => {
            const $io0 = input => Object.keys(input).every(key => {
                const value = input[key];
                if (undefined === value)
                    return true;
                if (true)
                    return true;
                return true;
            });
            return "object" === typeof input && null !== input && false === Array.isArray(input) && $io0(input);
        })(settings)) {
            return response.status(401).json({ error: 'missing info' });
        }
        const result = await userController.changeUserData(userID, { newSetting: settings });
        if (undefined !== result.error) {
            return response.status(500).json(result);
        }
        return response.status(200).json(result);
    }
    catch (error) {
        console.log(error);
        return response.status(500).json({
            error: 'unexpected server error',
        });
    }
});
userRouter.get('/user/', authRequest, async (request, response) => {
    try {
        const userID = request.cookies.uid;
        if (!(input => {
            return "string" === typeof input;
        })(userID)) {
            return response.status(401).json({ error: 'not allowed' });
        }
        const usr = await userController.getUser(userID);
        if (undefined !== usr.error) {
            if ('database error' === usr.error) {
                return response.status(500).json({
                    error: 'database error',
                });
            }
            return response.status(400).json(usr);
        }
        return response.status(200).json({ usr: usr.usr });
    }
    catch (error) {
        console.log(error);
        return response.status(500).json({
            error: 'unexpected server error',
        });
    }
});
userRouter.post('/user/device', authRequest, async (request, response) => {
    try {
        const userID = request.cookies.uid;
        const feedID = request.body.feedID;
        const name = request.body.name;
        const type = request.body.type;
        const apiKey = request.body.apiKey;
        const adaUsername = request.body.adaUsername;
        if (!(input => {
            return "string" === typeof input;
        })(userID)
            || !(input => {
                return "string" === typeof input;
            })(feedID)
            || !(input => {
                return "string" === typeof input;
            })(type)
            || !(input => {
                return "string" === typeof input;
            })(name)
            || !(input => {
                return "string" === typeof input;
            })(apiKey)
            || !(input => {
                return "string" === typeof input;
            })(adaUsername)) {
            return response.status(401).json({ error: 'not allowed' });
        }
        const result = await deviceController.createDevice(feedID, userID, name, type, apiKey, adaUsername);
        if (undefined !== result.error) {
            if ('Device already in use' === result.error) {
                return response.status(409).json(result);
            }
            return response.status(500).json(result);
        }
        return response.status(201).json(result);
    }
    catch (error) {
        console.log(error);
        return response.status(500).json({
            error: 'unexpected server error',
        });
    }
});
userRouter.get('/user/device', authRequest, async (request, response) => {
    try {
        const userID = request.cookies.uid;
        if (!(input => {
            return "string" === typeof input;
        })(userID)) {
            return response.status(401).json({ error: 'not allowed' });
        }
        const result = await deviceController.getUserDevice(userID);
        if (undefined === result) {
            return response.status(500).json({
                error: 'unexpected server error',
            });
        }
        return response.status(201).json(result);
    }
    catch (error) {
        console.log(error);
        return response.status(500).json({
            error: 'unexpected server error',
        });
    }
});
userRouter.post('/login/', async (request, response) => {
    try {
        const email = request.body.email;
        const password = request.body.password;
        if (!(input => {
            return "string" === typeof input;
        })(email) || !(input => {
            return "string" === typeof input;
        })(password)) {
            return response.status(400).json({
                error: 'missing information',
            });
        }
        const result = await userController.login(email, password);
        response.cookie('uid', result.uid, {
            httpOnly: true,
            sameSite: 'strict',
        });
        response.cookie('tokenType', result.tokenType, {
            httpOnly: true,
            sameSite: 'strict',
        });
        return response.status(201).json({ token: result.bearerToken });
    }
    catch (error) {
        console.log(error);
        return response.status(500).json({
            error: 'unexpected server error',
        });
    }
});
/*
userRouter.post('/account/delete', authRequest, async (request, response) => {
    try {
        const userID: unknown = request.cookies.uid;

        if (!typia.is<string>(userID)) {
            return response.status(401).json({error: 'not allowed'});
        }

        const result = await userController.deleteUser(userID);

        return response.status(200).json({result});
    } catch (error) {
        console.log(error);
        return response.status(500).json({
            error: 'unexpected server error',
        });
    }
});
*/
export default userRouter;
