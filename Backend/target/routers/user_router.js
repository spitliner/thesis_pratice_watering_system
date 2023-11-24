"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.put('/', async (request, response) => {
    try {
        const { username, password, name, surname, email, phone_number } = request.body;
        if (true) {
        }
    }
    catch (error) {
    }
});
router.get('/', async (request, response) => {
    try {
    }
    catch (error) {
    }
});
router.post('/', async (request, response) => {
    try {
        const { username, password } = request.body;
    }
    catch (error) {
    }
});
module.exports = router;
