import process from 'node:process';
import dotenv from 'dotenv';
import express from "express";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';

dotenv.config();

//---

import UserRouter from "./routers/user_router.js";
import DeviceRouter from "./routers/device_router.js";
import pollingJob from './cron-jobs/cron_request.js';

//---

const server = express();
server.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
server.use(cookieParser());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use("/api", UserRouter);
server.use("/api", DeviceRouter);

server.get('*', (request, response) => {
    return response.status(404).json({"error": "router not found"});
});

mongoose.connection.on("open", function() {
    //console.log(ref);
    console.log("Connected to mongo server.");
});

mongoose.connection.on("error", function(error) {
    console.log("Could not connect to mongo server!");
    console.log(error);
});

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@dev0.agidxfk.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(uri, {dbName: 'webGarden'});

let portNum : number = (Number(process.env.DB_PORT) || 9000);

//------

let exceptionOccured = false;

pollingJob.start();

process.on('uncaughtException', function(err) {
    console.log('Caught exception: ' + err);
    exceptionOccured = true;
    process.exit();
});

process.on('exit', function(code) {
    if(exceptionOccured) console.log('Exception occured');
    else console.log('Kill signal received');
    pollingJob.stop();
});

process.on('SIGINT', function() {
    process.exit();
});

process.on('SIGTERM', function() {
    process.exit();
});

//------

server.listen(portNum, () => {
    console.log("Server started on port " + portNum);
});
