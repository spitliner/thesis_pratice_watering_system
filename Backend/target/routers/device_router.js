import express from "express";
import authRequest from "../middleware/expressAuth.js";
import DeviceController from "../controllers/device_controllers.js";
import DataModel from "../database/models/data_model.js";
import UserController from "../controllers/user_controller.js";
import DeviceModel from "../database/models/device_model.js";
const DeviceRouter = express.Router();
DeviceRouter.get('/device/', authRequest, async (request, response) => {
    try {
        const userID = request.cookies["uid"];
        if (undefined === userID) {
            return response.status(400).json({ "error": "missing info" });
        }
        const deviceList = await UserController.getUserDevice(userID);
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
        const deviceInfo = await DeviceController.getDevice(deviceID, userID);
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
        const key = request.body.key;
        if (undefined === request.body.key) {
            return response.status(400).json({ "error": "Missing key to check" });
        }
        if (await DeviceModel.checkKey(key)) {
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
        const result = await DeviceController.changeSettings(deviceID, userID, newSettings);
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
        const result = await DeviceController.changeName(deviceID, userID, newName);
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
        const { newType } = request.body;
        const result = await DeviceController.changeType(deviceID, userID, newType);
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
DeviceRouter.post('/device/:deviceID/schedule', authRequest, async (request, response) => {
    try {
        const userID = request.cookies["uid"];
        const deviceID = request.params.deviceID;
        const { newSchedule } = request.body;
        const result = await DeviceController.changeSchedule(deviceID, userID, newSchedule);
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
        const { apiKey } = request.body;
        const result = await DeviceController.changeAPIkey(deviceID, userID, apiKey);
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
DeviceRouter.get('/device/delete/:deviceID', authRequest, async (request, response) => {
    try {
        const userID = request.cookies["uid"];
        const deviceID = request.params.deviceID;
        const result = await DeviceController.deleteDevice(deviceID, userID);
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
        const deviceInfo = await DeviceController.getDevice(deviceID, userID);
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
