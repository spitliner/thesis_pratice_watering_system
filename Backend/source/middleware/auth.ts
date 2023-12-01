import dotenv from 'dotenv';
dotenv.config();

import argon2 from 'argon2';
import * as jose from 'jose'
import crypto from 'node:crypto';
import { privateKey, publicKey } from "../config/loadKeyPair.js";

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

    static async createToken(payload : any) {
        payload["padding"] = crypto.randomBytes(48).toString('base64');
        return new jose.SignJWT(payload)
       .setProtectedHeader({ alg: "EdDSA" }) //Ed25519
       .setExpirationTime('12h')
       .setNotBefore('0.1s')
       .sign(privateKey);
    }

    static async verifyToken(token : string) {
        try {
            const { payload, protectedHeader } = await jose.jwtVerify(token, publicKey, {
                algorithms: ["EdDSA"]
            });
            return payload;
        } catch (err) {
            console.log(err)
            return {"error": "invalid token"}
        }
    }
}

/*
Authentication.createToken({a: "b"}).then(async (result) => {
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    console.log(result);
await sleep(1000);
    Authentication.verifyToken(result).then((token) => {
        console.log(token);
    })
});
*/
export default Authentication;