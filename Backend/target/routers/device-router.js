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
        const userID = request.cookies.uid;
        if (!(input => {
            return "string" === typeof input;
        })(userID)) {
            return response.status(400).json({ error: 'missing info' });
        }
        const deviceList = await userController.getUserDevice(userID);
        return response.status(200).json({
            deviceList,
        });
    }
    catch (error) {
        console.log(error);
        return response.status(500).json({
            error: 'unexpected server error',
        });
    }
});
deviceRouter.get('/device/:deviceID', authRequest, async (request, response) => {
    try {
        const userID = request.cookies.uid;
        const deviceID = request.params.deviceID;
        if (!(input => {
            return "string" === typeof input;
        })(userID)) {
            return response.status(400).json({ error: 'missing info' });
        }
        const deviceInfo = await deviceController.getDevice(deviceID, userID);
        if (null === deviceInfo) {
            return response.status(404).json({ error: 'device not found' });
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
    }
    catch (error) {
        console.log(error);
        return response.status(500).json({
            error: 'unexpected server error',
        });
    }
});
deviceRouter.post('/device/duplicateKey', authRequest, async (request, response) => {
    try {
        const feedID = request.body.feedID;
        const username = request.body.adaUsername;
        if (!(input => {
            return "string" === typeof input;
        })(feedID) || !(input => {
            return "string" === typeof input;
        })(username)) {
            return response.status(400).json({ error: 'missing key to check' });
        }
        if (await deviceModel.checkFeedKey(feedID, username)) {
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
deviceRouter.post('/device/:deviceID/settings', authRequest, async (request, response) => {
    try {
        const userID = request.cookies.uid;
        const deviceID = request.params.deviceID;
        const newSettings = request.body.newSettings;
        if (!(input => {
            return "string" === typeof input;
        })(userID) || !(input => {
            return "string" === typeof input;
        })(deviceID) || !(input => {
            const $io0 = input => Object.keys(input).every(key => {
                const value = input[key];
                if (undefined === value)
                    return true;
                if (true)
                    return true;
                return true;
            });
            return "object" === typeof input && null !== input && false === Array.isArray(input) && $io0(input);
        })(newSettings)) {
            return response.status(400).json({ error: 'missing info' });
        }
        const result = await deviceController.changeSettings(deviceID, userID, newSettings);
        if (undefined === result.error) {
            return response.status(200).json(result);
        }
        return response.status(500).json(result);
    }
    catch (error) {
        console.log(error);
        return response.status(500).json({
            error: 'unexpected server error',
        });
    }
});
deviceRouter.post('/device/:deviceID/name', authRequest, async (request, response) => {
    try {
        const userID = request.cookies.uid;
        const deviceID = request.params.deviceID;
        const newName = request.body.newName;
        if (!(input => {
            return "string" === typeof input;
        })(userID) || !(input => {
            return "string" === typeof input;
        })(deviceID) || !(input => {
            return "string" === typeof input;
        })(newName)) {
            return response.status(400).json({ error: 'missing info' });
        }
        const result = await deviceController.changeName(deviceID, userID, newName);
        if (undefined === result.error) {
            return response.status(200).json(result);
        }
        return response.status(500).json(result);
    }
    catch (error) {
        console.log(error);
        return response.status(500).json({
            error: 'unexpected server error',
        });
    }
});
deviceRouter.post('/device/:deviceID/type', authRequest, async (request, response) => {
    try {
        const userID = request.cookies.uid;
        const deviceID = request.params.deviceID;
        const type = request.body.type;
        if (!(input => {
            return "string" === typeof input;
        })(userID) || !(input => {
            return "string" === typeof input;
        })(deviceID) || !(input => {
            return "string" === typeof input;
        })(type)) {
            return response.status(400).json({ error: 'missing info' });
        }
        const result = await deviceController.changeType(deviceID, userID, type);
        if (undefined === result.error) {
            return response.status(200).json(result);
        }
        return response.status(500).json(result);
    }
    catch (error) {
        console.log(error);
        return response.status(500).json({
            error: 'unexpected server error',
        });
    }
});
deviceRouter.post('/device/:deviceID/schedules', authRequest, async (request, response) => {
    try {
        const userID = request.cookies.uid;
        const deviceID = request.params.deviceID;
        const schedules = request.body.schedules;
        if (!(input => {
            return "string" === typeof input;
        })(userID) || !(input => {
            return "string" === typeof input;
        })(deviceID) || !(input => {
            return Array.isArray(input) && input.every(elem => Array.isArray(elem) && elem.every(elem => "string" === typeof elem));
        })(schedules)) {
            return response.status(400).json({ error: 'missing info' });
        }
        const result = await deviceController.changeSchedule(deviceID, userID, schedules);
        if (undefined === result.error) {
            return response.status(200).json(result);
        }
        return response.status(500).json(result);
    }
    catch (error) {
        console.log(error);
        return response.status(500).json({
            error: 'unexpected server error',
        });
    }
});
deviceRouter.post('/device/:deviceID/apiKey', authRequest, async (request, response) => {
    try {
        const userID = request.cookies.uid;
        const deviceID = request.params.deviceID;
        const apiKey = request.body.apiKey;
        const adaUsername = request.body.adaUsername;
        const feedID = request.body.feedID;
        if (!(input => {
            return "string" === typeof input;
        })(userID) || !(input => {
            return "string" === typeof input;
        })(deviceID) || !(input => {
            return "string" === typeof input;
        })(apiKey) || !(input => {
            return "string" === typeof input;
        })(adaUsername) || !(input => {
            return "string" === typeof input;
        })(feedID)) {
            return response.status(400).json({ error: 'missing info' });
        }
        const result = await deviceController.changeAPIkey(deviceID, userID, apiKey, adaUsername, feedID);
        if (undefined === result.error) {
            return response.status(200).json(result);
        }
        return response.status(500).json(result);
    }
    catch (error) {
        console.log(error);
        return response.status(500).json({
            error: 'unexpected server error',
        });
    }
});
deviceRouter.post('/device/delete/:deviceID', authRequest, async (request, response) => {
    try {
        const userID = request.cookies.uid;
        const deviceID = request.params.deviceID;
        if (!(input => {
            return "string" === typeof input;
        })(userID) || !(input => {
            return "string" === typeof input;
        })(deviceID)) {
            return response.status(400).json({ error: 'missing info' });
        }
        const result = await deviceController.deleteDevice(deviceID, userID);
        if (null === result) {
            return response.status(500).json({
                error: 'database error',
            });
        }
        return response.status(200).json({ result });
    }
    catch (error) {
        console.log(error);
        return response.status(500).json({
            error: 'unexpected server error',
        });
    }
});
deviceRouter.get('/device/:deviceID/feed', authRequest, async (request, response) => {
    try {
        const userID = request.cookies.uid;
        const deviceID = request.params.deviceID;
        if (!(input => {
            return "string" === typeof input;
        })(userID) || !(input => {
            return "string" === typeof input;
        })(deviceID)) {
            return response.status(400).json({ error: 'missing info' });
        }
        const deviceInfo = await deviceController.getDevice(deviceID, userID);
        if (null === deviceInfo) {
            return response.status(404).json({ error: 'device not found' });
        }
        if (undefined === deviceInfo) {
            return response.status(500).json({
                error: 'unexpected database error',
            });
        }
        return response.status(200).json({
            feed: await dataModel.getData(deviceID),
        });
    }
    catch (error) {
        console.log(error);
        return response.status(500).json({
            error: 'unexpected server error',
        });
    }
});
deviceRouter.post('/device/:deviceID/status', authRequest, async (request, response) => {
    try {
        const userID = request.cookies.uid;
        const deviceID = request.params.deviceID;
        const newStatus = request.body.status;
        if (!(input => {
            return "string" === typeof input;
        })(userID) || !(input => {
            return "string" === typeof input;
        })(deviceID) || !(input => {
            return "string" === typeof input;
        })(newStatus)) {
            return response.status(400).json({ error: 'missing info' });
        }
        const result = await deviceController.changeDeviceStatus(deviceID, userID, newStatus);
        if (undefined !== result.error) {
            return response.status(401).json({ error: result.error });
        }
        return response.status(200).json({ result: result.result });
    }
    catch (error) {
        console.log(error);
        return response.status(500).json({
            error: 'unexpected server error',
        });
    }
});
export default deviceRouter;
//# sourceMappingURL=device-router.js.map