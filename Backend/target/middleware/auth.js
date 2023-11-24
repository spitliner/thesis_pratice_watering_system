"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const argon2_1 = __importDefault(require("argon2"));
const jose_1 = __importDefault(require("jose"));
const crypto_1 = __importDefault(require("crypto"));
class Authentication {
    static async hashPassword(password) {
        return argon2_1.default.hash(password, {
            type: argon2_1.default.argon2id,
            hashLength: 100,
            timeCost: 4,
        });
    }
    static async verifyPassword(password, hash) {
        return argon2_1.default.verify(hash, password);
    }
    static createToken(payload) {
        payload["padding"] = crypto_1.default.randomBytes(48).toString('base64');
        /*
        return new jose.SignJWT(payload, {key: "privateKey", passphrase: String(process.env["KEY_PASS"])}, {
            header: {
                alg: "ES384",
                typ: "JWT"
            },
            algorithm: "ES384",
            expiresIn: "24h",
            notBefore: Math.floor(Date.now() / 1000)
        });
        */
        return new jose_1.default.SignJWT(payload)
            .setProtectedHeader({ alg: "EdDSA" }) //Ed25519
            .setExpirationTime('12h')
            .setNotBefore(Math.floor(Date.now() / 1000))
            .sign();
    }
    static verifyToken(token) {
        let decode = null;
        try {
            decode = jwt.verify(token, "publicKey", {
                algorithms: ["ES384"],
            });
        }
        catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                return {
                    "Error": "expired token"
                };
            }
            else if (error instanceof jwt.JsonWebTokenError) {
                return {
                    "Error": "invalid token"
                };
            }
            else
                return {
                    "Error": "server error"
                };
        }
        return decode;
    }
}
//console.log(AuthMiddle.verifyToken(AuthMiddle.createToken({a: "b"})));
//console.log(AuthMiddle.createToken({a: "b"}));
exports.default = Authentication;
