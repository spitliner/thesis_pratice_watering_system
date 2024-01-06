/* eslint-disable @typescript-eslint/naming-convention */
import express from 'express';
import typia from 'typia';
import authRequest from '../middleware/express-auth.js';
import deviceController from '../controllers/device-controllers.js';
import dataModel from '../database/models/data-model.js';
import userController from '../controllers/user-controller.js';
import deviceModel from '../database/models/device-model.js';

const deviceRouter = express.Router(); // eslint-disable-line new-cap

deviceRouter.get('/device/', authRequest, async (request, response) => {
    try {
        const userID: unknown = request.cookies.uid;

        if (!typia.is<string>(userID)) {
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
        const userID: unknown = request.cookies.uid;
        const deviceID = request.params.deviceID;

        if (!typia.is<string>(userID)) {
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
        });
    } catch (error) {
        console.log(error);
        return response.status(500).json({
            error: 'unexpected server error',
        });
    }
});

deviceRouter.post('/device/duplicateKey', authRequest, async (request, response) => {
    try {
        const feedID: unknown = request.body.feedID;
        const username: unknown = request.body.adaUsername;

        if (!typia.is<string>(feedID) || !typia.is<string>(username)) {
            return response.status(400).json({error: 'missing key to check'});
        }

        if (await deviceModel.checkFeedKey(feedID, username)) {
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
        const userID: unknown = request.cookies.uid;
        const deviceID: unknown = request.params.deviceID;
        const newSettings: unknown = request.body.newSettings;

        if (!typia.is<string>(userID) || !typia.is<string>(deviceID) || !typia.is<Record<string, unknown>>(newSettings)) {
            return response.status(400).json({error: 'missing info'});
        }

        const result = await deviceController.changeSettings(deviceID, userID, newSettings);

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

deviceRouter.post('/device/:deviceID/name', authRequest, async (request, response) => {
    try {
        const userID: unknown = request.cookies.uid;
        const deviceID: unknown = request.params.deviceID;
        const newName: unknown = request.body.newName;

        if (!typia.is<string>(userID) || !typia.is<string>(deviceID) || !typia.is<string>(newName)) {
            return response.status(400).json({error: 'missing info'});
        }

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
        const userID: unknown = request.cookies.uid;
        const deviceID: unknown = request.params.deviceID;
        const type: unknown = request.body.type;

        if (!typia.is<string>(userID) || !typia.is<string>(deviceID) || !typia.is<string>(type)) {
            return response.status(400).json({error: 'missing info'});
        }

        const result = await deviceController.changeType(deviceID, userID, type);

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

deviceRouter.post('/device/:deviceID/schedules', authRequest, async (request, response) => {
    try {
        const userID: unknown = request.cookies.uid;
        const deviceID: unknown = request.params.deviceID;
        const schedules: unknown = request.body.schedules;

        if (!typia.is<string>(userID) || !typia.is<string>(deviceID) || !typia.is<string[][]>(schedules)) {
            return response.status(400).json({error: 'missing info'});
        }

        const result = await deviceController.changeSchedule(deviceID, userID, schedules);

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

deviceRouter.post('/device/:deviceID/apiKey', authRequest, async (request, response) => {
    try {
        const userID: unknown = request.cookies.uid;
        const deviceID: unknown = request.params.deviceID;
        const apiKey: unknown = request.body.apiKey;
        const adaUsername: unknown = request.body.adaUsername;
        const feedID: unknown = request.body.feedID;

        if (!typia.is<string>(userID) || !typia.is<string>(deviceID) || !typia.is<string>(apiKey) || !typia.is<string>(adaUsername) || !typia.is<string>(feedID)) {
            return response.status(400).json({error: 'missing info'});
        }

        const result = await deviceController.changeAPIkey(deviceID, userID, apiKey, adaUsername, feedID);

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

deviceRouter.post('/device/:deviceID/limit', authRequest, async (request, response) => {
    try {
        const userID: unknown = request.cookies.uid;
        const deviceID: unknown = request.params.deviceID;
        const limit: unknown = request.body.limit;

        if (!typia.is<string>(userID) || !typia.is<string>(deviceID) || !typia.is<number[]>(limit)) {
            return response.status(400).json({error: 'missing info'});
        }

        const result = await deviceController.changeDeviceLimit(deviceID, userID, limit);

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
        const userID: unknown = request.cookies.uid;
        const deviceID: unknown = request.params.deviceID;

        if (!typia.is<string>(userID) || !typia.is<string>(deviceID)) {
            return response.status(400).json({error: 'missing info'});
        }

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
        const userID: unknown = request.cookies.uid;
        const deviceID: unknown = request.params.deviceID;

        if (!typia.is<string>(userID) || !typia.is<string>(deviceID)) {
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

deviceRouter.post('/device/:deviceID/status', authRequest, async (request, response) => {
    try {
        const userID: unknown = request.cookies.uid;
        const deviceID: unknown = request.params.deviceID;
        const newStatus: unknown = request.body.status;

        if (!typia.is<string>(userID) || !typia.is<string>(deviceID) || !typia.is<string>(newStatus)) {
            return response.status(400).json({error: 'missing info'});
        }

        const result = await deviceController.changeDeviceStatus(deviceID, userID, newStatus);

        if (undefined !== result.error) {
            return response.status(401).json({error: result.error});
        }

        return response.status(200).json({result: result.result});
    } catch (error) {
        console.log(error);
        return response.status(500).json({
            error: 'unexpected server error',
        });
    }
});

export default deviceRouter;
