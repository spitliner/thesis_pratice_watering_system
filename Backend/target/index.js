import process from 'node:process';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import userRouter from './routers/user-router.js';
import deviceRouter from './routers/device-router.js';
import pollingJob from './cron-jobs/cron-request.js';
//---
dotenv.config();
//---
const server = express();
server.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
server.use(cookieParser());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use('/api', userRouter);
server.use('/api', deviceRouter);
server.get('*', (request, response) => response.status(404).json({ error: 'router not found' }));
mongoose.connection.on('open', () => {
    // console.log(ref);
    console.log('Connected to mongo server.');
});
mongoose.connection.on('error', error => {
    console.log('Could not connect to mongo server!');
    console.log(error);
});
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@dev0.agidxfk.mongodb.net/?retryWrites=true&w=majority`;
void mongoose.connect(uri, { dbName: 'webGarden' });
const portNumber = (Number(process.env.DB_PORT) || 9000);
//------
let exceptionOccured = false;
pollingJob.start();
process.on('uncaughtException', error => {
    console.log('Caught exception:', error);
    exceptionOccured = true;
    process.exit();
});
process.on('exit', () => {
    if (exceptionOccured) {
        console.log('Exception occured');
    }
    else {
        console.log('Kill signal received');
    }
    pollingJob.stop();
});
process.on('SIGINT', () => {
    process.exit();
});
process.on('SIGTERM', () => {
    process.exit();
});
//------
server.listen(portNumber, () => {
    console.log('Server started on port ' + portNumber);
});
