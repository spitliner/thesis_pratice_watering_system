require("dotenv").config();
import argon2 = require('argon2');
import jwt from "jsonwebtoken";
import { Algorithm } from "jsonwebtoken";
import crypto from 'crypto';
//import privateKey from "../config/loadPrivateKey.js";
//import publicKey from "../config/loadPublickey.js";

class Authentication {
    static async hashPassword(password : string) {
        return argon2.hash(password, {
            type: argon2.argon2id,
            hashLength: 100,
            timeCost: 4,
        });
    }

    static async verifyPassword(password : string, hash : string) {
        return argon2.verify(hash, password);
    }

    static createToken(payload : any) {
        payload["padding"] = crypto.randomBytes(48).toString('base64');
        return jwt.sign(payload, {key: "privateKey", passphrase: String(process.env["KEY_PASS"]}), {
            header: {
                alg: "ES384",
                typ: "JWT"
            },
            algorithm: "ES384",
            expiresIn: "24h",
            notBefore: Math.floor(Date.now() / 1000)
        });
    }

    static verifyToken(token : string) {
        let decode = null;
        try {
            decode = jwt.verify(token, "publicKey", {
                algorithms: ["ES384"],
            });
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                return {
                    "Error": "expired token"
                }
            } else if (error instanceof jwt.JsonWebTokenError) {
                return {
                    "Error": "invalid token"
                }
            } else return {
                "Error": "server error"
            }
        }
        
        return decode;
    }
}
//console.log(AuthMiddle.verifyToken(AuthMiddle.createToken({a: "b"})));
//console.log(AuthMiddle.createToken({a: "b"}));

export default Authentication;