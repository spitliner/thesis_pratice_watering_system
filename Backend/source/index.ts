require("dotenv").config();
import express from "express";
import cors from "cors";

const server = express();
server.use(cors);
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

let portNum : number = (Number(process.env.PORT) || 3000);

server.listen(portNum, () => {
    console.log("Server started on port " + portNum);
});