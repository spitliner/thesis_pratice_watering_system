"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const server = (0, express_1.default)();
server.use(cors_1.default);
server.use(express_1.default.json());
server.use(express_1.default.urlencoded({ extended: true }));
let portNum = (Number(process.env.PORT) || 3000);
server.listen(portNum, () => {
    console.log("Server started on port " + portNum);
});
