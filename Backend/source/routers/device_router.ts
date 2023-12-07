import express from "express";
import authRequest from "../middleware/expressAuth.js";
import DeviceController from "../controllers/device_controllers.js";
import DataModel from "../database/models/data_model.js";
import UserController from "../controllers/user_controller.js";

const DeviceRouter = express.Router();

DeviceRouter.get('/device/', authRequest, async (request, response) => {
    try {
        const userID = request.cookies["uid"];
        if (undefined === userID) {
            return response.status(400).json({"error": "missing info"});
        }
        const deviceList = await UserController.getUserDevice(userID);
        return response.status(200).json({
            "deviceList": deviceList
        })
    } catch (error) {
        console.log(error);
        return response.status(500).json({
            "error": "unexpected server error"
        });
    }
});

DeviceRouter.get('/device/:deviceID', authRequest, async (request, response) => {
    try {
        //const userID = request.cookies["uid"];
        const deviceID = request.params.deviceID;
        if (undefined === deviceID) {
            return response.status(400).json({"error": "missing info"});
        }
        const deviceInfo = await DeviceController.getDevice(deviceID);
        if (null === deviceInfo) {
            return response.status(404).json({"error": "device not found"});
        }
        else if (undefined === deviceInfo) {
            return response.status(500).json({
                "error": "unexpected database error"
            });
        }
        return response.status(200).json({
            "info": deviceInfo,
            "feed": await DataModel.getData(deviceID)
        })
    } catch (error) {
        console.log(error);
        return response.status(500).json({
            "error": "unexpected server error"
        });
    }
});

DeviceRouter.post('/device/:deviceID', authRequest, async (request, response) => {
    try {
        
    } catch (error) {
        console.log(error);
        return response.status(500).json({
            "error": "unexpected server error"
        });
    }
});

DeviceRouter.get('/device/:deviceID/feed', authRequest, async (request, response) => {
    try {
        const deviceID = request.params.deviceID;
        if (undefined === deviceID) {
            return response.status(400).json({"error": "missing info"});
        }
        const deviceInfo = await DeviceController.getDevice(deviceID);
        if (null === deviceInfo) {
            return response.status(404).json({"error": "device not found"});
        }
        else if (undefined === deviceInfo) {
            return response.status(500).json({
                "error": "unexpected database error"
            });
        }
        return response.status(200).json({
            "feed": await DataModel.getData(deviceID)
        })
    } catch (error) {
        console.log(error);
        return response.status(500).json({
            "error": "unexpected server error"
        });
    }
});

export default DeviceRouter;