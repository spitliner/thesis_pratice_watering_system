"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = __importDefault(require("mysql2"));
const connectionPool = mysql2_1.default.createPool({
    host: process.env.HOST,
    user: process.env.DATABASE_USER,
    waitForConnections: true,
    connectionLimit: 100,
    maxIdle: 10,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_NAME,
    timezone: process.env.TIMEZONE,
});
exports.default = connectionPool;
