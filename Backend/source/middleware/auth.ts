require("dotenv").config();
import argon2 from 'argon2';
import * as jose from 'jose'
import crypto from 'node:crypto';
import {privateKey, publicKey} from "../config/loadKeyPair";

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
       //.setNotBefore(Math.floor(Date.now() / 1000) * 1000)
       .sign(privateKey);
    }

    static async verifyToken(token : string) {
        try {
            const { payload, protectedHeader } = await jose.jwtVerify(token, publicKey, {
                algorithms: ["EdDSA"]
            });
            return payload;
        } catch (ERR_JWT_CLAIM_VALIDATION_FAILED) {
            
        }
    }
}

Authentication.createToken({a: "b"}).then((result) => {
    console.log(result);
    Authentication.verifyToken(result).then((token) => {
        console.log(token);
    })
});

export default Authentication;