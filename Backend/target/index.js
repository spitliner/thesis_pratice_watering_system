import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
//---
import UserRouter from "./routers/user_router.js";
import DeviceRouter from "./routers/device_router.js";
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
    return response.status(404).json({ "error": "router not found" });
});
mongoose.connection.on("open", function () {
    //console.log(ref);
    console.log("Connected to mongo server.");
});
mongoose.connection.on("error", function (error) {
    console.log("Could not connect to mongo server!");
    console.log(error);
});
// const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@dev0.agidxfk.mongodb.net/?retryWrites=true&w=majority`;
const uri = `mongodb+srv://dev:eViYIinNHi6iH2rA@dev0.agidxfk.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(uri);
<<<<<<< HEAD
// let portNum = (Number(process.env.PORT));
let portNum = 27017
=======
let portNum = (Number(process.env.DB_PORT) || 9000);
>>>>>>> 7f40234898d70b21a7a7c2c12f7b6b9142273fb3
server.listen(portNum, () => {
    console.log("Server started on port " + portNum);
});

