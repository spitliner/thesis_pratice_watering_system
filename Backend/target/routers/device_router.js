import express from "express";
import authRequest from "../middleware/expressAuth.js";
import deviceController from "../controllers/device_controllers.js";
import DataModel from "../database/models/data_model.js";
import userController from "../controllers/user_controller.js";
import deviceModel from "../database/models/device_model.js";
const DeviceRouter = express.Router();
DeviceRouter.get('/device/', authRequest, async (request, response) => {
    try {
        const userID = request.cookies["uid"];
        if (undefined === userID) {
            return response.status(400).json({ "error": "missing info" });
        }
        const deviceList = await userController.getUserDevice(userID);
        return response.status(200).json({
            "deviceList": deviceList
        });
    }
    catch (error) {
        console.log(error);
        return response.status(500).json({
            "error": "unexpected server error"
        });
    }
});
DeviceRouter.get('/device/:deviceID', authRequest, async (request, response) => {
    try {
        const userID = request.cookies["uid"];
        const deviceID = request.params.deviceID;
        if (undefined === deviceID) {
            return response.status(400).json({ "error": "missing info" });
        }
        const deviceInfo = await deviceController.getDevice(deviceID, userID);
        if (null === deviceInfo) {
            return response.status(404).json({ "error": "device not found" });
        }
        else if (undefined === deviceInfo) {
            return response.status(500).json({
                "error": "unexpected database error"
            });
        }
        return response.status(200).json({
            "info": deviceInfo,
            "feed": await DataModel.getData(deviceID)
        });
    }
    catch (error) {
        console.log(error);
        return response.status(500).json({
            "error": "unexpected server error"
        });
    }
});
DeviceRouter.post('/device/duplicateKey', authRequest, async (request, response) => {
    try {
        const key = request.body.apiKey;
        const username = request.body.adaUsername;
        if (undefined === key) {
            return response.status(400).json({ "error": "Missing key to check" });
        }
        if (await deviceModel.checkKey(key, username)) {
            return response.status(200).json({
                "result": false
            });
        }
        return response.status(200).json({
            "result": true
        });
    }
    catch (error) {
        console.log(error);
        return response.status(500).json({
            "error": "unexpected server error"
        });
    }
});
DeviceRouter.post('/device/:deviceID/settings', authRequest, async (request, response) => {
    try {
        const userID = request.cookies["uid"];
        const deviceID = request.params.deviceID;
        const { newSettings } = request.body;
        const result = await deviceController.changeSettings(deviceID, userID, newSettings);
        if (undefined === result.error) {
            return response.status(200).json(result);
        }
        return response.status(500).json(result);
    }
    catch (error) {
        console.log(error);
        return response.status(500).json({
            "error": "unexpected server error"
        });
    }
});
DeviceRouter.post('/device/:deviceID/name', authRequest, async (request, response) => {
    try {
        const userID = request.cookies["uid"];
        const deviceID = request.params.deviceID;
        const { newName } = request.body;
        const result = await deviceController.changeName(deviceID, userID, newName);
        if (undefined === result.error) {
            return response.status(200).json(result);
        }
        return response.status(500).json(result);
    }
    catch (error) {
        console.log(error);
        return response.status(500).json({
            "error": "unexpected server error"
        });
    }
});
DeviceRouter.post('/device/:deviceID/type', authRequest, async (request, response) => {
    try {
        const userID = request.cookies["uid"];
        const deviceID = request.params.deviceID;
        const { type } = request.body;
        const result = await deviceController.changeType(deviceID, userID, type);
        if (undefined === result.error) {
            return response.status(200).json(result);
        }
        return response.status(500).json(result);
    }
    catch (error) {
        console.log(error);
        return response.status(500).json({
            "error": "unexpected server error"
        });
    }
});
DeviceRouter.post('/device/:deviceID/schedules', authRequest, async (request, response) => {
    try {
        const userID = request.cookies["uid"];
        const deviceID = request.params.deviceID;
        const { schedules } = request.body;
        const result = await deviceController.changeSchedule(deviceID, userID, schedules);
        if (undefined === result.error) {
            return response.status(200).json(result);
        }
        return response.status(500).json(result);
    }
    catch (error) {
        console.log(error);
        return response.status(500).json({
            "error": "unexpected server error"
        });
    }
});
DeviceRouter.post('/device/:deviceID/apiKey', authRequest, async (request, response) => {
    try {
        const userID = request.cookies["uid"];
        const deviceID = request.params.deviceID;
        const { apiKey, adaUsername } = request.body;
        const result = await deviceController.changeAPIkey(deviceID, userID, apiKey, adaUsername);
        if (undefined === result.error) {
            return response.status(200).json(result);
        }
        return response.status(500).json(result);
    }
    catch (error) {
        console.log(error);
        return response.status(500).json({
            "error": "unexpected server error"
        });
    }
});
DeviceRouter.post('/device/delete/:deviceID', authRequest, async (request, response) => {
    try {
        const userID = request.cookies["uid"];
        const deviceID = request.params.deviceID;
        const result = await deviceController.deleteDevice(deviceID, userID);
        if (null === result) {
            return response.status(500).json({
                "error": "Database error"
            });
        }
        return response.status(200).json({ result: result });
    }
    catch (error) {
        console.log(error);
        return response.status(500).json({
            "error": "unexpected server error"
        });
    }
});
DeviceRouter.get('/device/:deviceID/feed', authRequest, async (request, response) => {
    try {
        const userID = request.cookies["uid"];
        const deviceID = request.params.deviceID;
        if (undefined === deviceID) {
            return response.status(400).json({ "error": "missing info" });
        }
        const deviceInfo = await deviceController.getDevice(deviceID, userID);
        if (null === deviceInfo) {
            return response.status(404).json({ "error": "device not found" });
        }
        else if (undefined === deviceInfo) {
            return response.status(500).json({
                "error": "unexpected database error"
            });
        }
        return response.status(200).json({
            "feed": await DataModel.getData(deviceID)
        });
    }
    catch (error) {
        console.log(error);
        return response.status(500).json({
            "error": "unexpected server error"
        });
    }
});
export default DeviceRouter;
