import express from 'express';
import authRequest from '../middleware/express-auth.js';
import deviceController from '../controllers/device-controllers.js';
import dataModel from '../database/models/data-model.js';
import userController from '../controllers/user-controller.js';
import deviceModel from '../database/models/device-model.js';

const deviceRouter = express.Router(); // eslint-disable-line new-cap

deviceRouter.get('/device/', authRequest, async (request, response) => {
    try {
        const userID = String(request.cookies.uid);
        if (undefined === userID) {
            return response.status(400).json({error: 'missing info'});
        }

        const deviceList = await userController.getUserDevice(userID);
        return response.status(200).json({
            deviceList,
        });
    } catch (error) {
        console.log(error);
        return response.status(500).json({
            error: 'unexpected server error',
        });
    }
});

deviceRouter.get('/device/:deviceID', authRequest, async (request, response) => {
    try {
        const userID = String(request.cookies.uid);
        const deviceID = request.params.deviceID;
        if (undefined === deviceID) {
            return response.status(400).json({error: 'missing info'});
        }

        const deviceInfo = await deviceController.getDevice(deviceID, userID);
        if (null === deviceInfo) {
            return response.status(404).json({error: 'device not found'});
        }

        if (undefined === deviceInfo) {
            return response.status(500).json({
                error: 'unexpected database error',
            });
        }

        return response.status(200).json({
            info: deviceInfo,
            feed: await dataModel.getData(deviceID),
        })
    } catch (error) {
        console.log(error);
        return response.status(500).json({
            error: 'unexpected server error'
        });
    }
});

deviceRouter.post('/device/duplicateKey', authRequest, async (request, response) => {
    try {
        const key: string = request.body.apiKey;
        const username: string = request.body.adaUsername;

        if (undefined === key) {
            return response.status(400).json({error: 'Missing key to check'});
        }

        if (await deviceModel.checkKey(key, username)) {
            return response.status(200).json({
                result: false,
            });
        }

        return response.status(200).json({
            result: true,
        });
    } catch (error) {
        console.log(error);
        return response.status(500).json({
            error: 'unexpected server error',
        });
    }
});

deviceRouter.post('/device/:deviceID/settings', authRequest, async (request, response) => {
    try {
        const userID = request.cookies["uid"];
        const deviceID = request.params.deviceID;
        const {newSettings} = request.body;

        const result = await deviceController.changeSettings(deviceID, userID, newSettings);

        if (undefined === result.error) {
            return response.status(200).json(result);
        }

        return response.status(500).json(result);
    } catch (error) {
        console.log(error);
        return response.status(500).json({
            error: 'unexpected server error'
        });
    }
});

deviceRouter.post('/device/:deviceID/name', authRequest, async (request, response) => {
    try {
        const userID = request.cookies["uid"];
        const deviceID = request.params.deviceID;
        const {newName} = request.body;

        const result = await deviceController.changeName(deviceID, userID, newName);

        if (undefined === result.error) {
            return response.status(200).json(result);
        }

        return response.status(500).json(result);
    } catch (error) {
        console.log(error);
        return response.status(500).json({
            error: 'unexpected server error',
        });
    }
});

deviceRouter.post('/device/:deviceID/type', authRequest, async (request, response) => {
    try {
        const userID = request.cookies["uid"];
        const deviceID = request.params.deviceID;
        const {type} = request.body;

        const result = await deviceController.changeType(deviceID, userID, type);

        if (undefined === result.error) {
            return response.status(200).json(result);
        }

        return response.status(500).json(result);
    } catch (error) {
        console.log(error);
        return response.status(500).json({
            error: 'unexpected server error'
        });
    }
});

deviceRouter.post('/device/:deviceID/schedules', authRequest, async (request, response) => {
    try {
        const userID = request.cookies["uid"];
        const deviceID = request.params.deviceID;
        const {schedules} = request.body;
        const result = await deviceController.changeSchedule(deviceID, userID, schedules);

        if (undefined === result.error) {
            return response.status(200).json(result);
        }

        return response.status(500).json(result);
    } catch (error) {
        console.log(error);
        return response.status(500).json({
            error: 'unexpected server error'
        });
    }
});

deviceRouter.post('/device/:deviceID/apiKey', authRequest, async (request, response) => {
    try {
        const userID = request.cookies["uid"];
        const deviceID = request.params.deviceID;
        const {apiKey, adaUsername} = request.body;

        const result = await deviceController.changeAPIkey(deviceID, userID, apiKey, adaUsername);

        if (undefined === result.error) {
            return response.status(200).json(result);
        }

        return response.status(500).json(result);
    } catch (error) {
        console.log(error);
        return response.status(500).json({
            error: 'unexpected server error',
        });
    }
});

deviceRouter.post('/device/delete/:deviceID', authRequest, async (request, response) => {
    try {
        const userID = request.cookies["uid"];
        const deviceID = request.params.deviceID;

        const result = await deviceController.deleteDevice(deviceID, userID);

        if (null === result) {
            return response.status(500).json({
                error: 'database error',
            });
        }

        return response.status(200).json({result});
    } catch (error) {
        console.log(error);
        return response.status(500).json({
            error: 'unexpected server error',
        });
    }
});

deviceRouter.get('/device/:deviceID/feed', authRequest, async (request, response) => {
    try {
        const userID = request.cookies["uid"];
        const deviceID = request.params.deviceID;
        if (undefined === deviceID) {
            return response.status(400).json({error: 'missing info'});
        }
        const deviceInfo = await deviceController.getDevice(deviceID, userID);
        if (null === deviceInfo) {
            return response.status(404).json({error: 'device not found'});
        }

        if (undefined === deviceInfo) {
            return response.status(500).json({
                error: 'unexpected database error',
            });
        }

        return response.status(200).json({
            feed: await dataModel.getData(deviceID),
        });
    } catch (error) {
        console.log(error);
        return response.status(500).json({
            error: 'unexpected server error',
        });
    }
});

export default deviceRouter;
