require("dotenv").config();
import argon2 = require('argon2');

class Authentication {
    public static async passwordHash (password : string) {
        try {
            return argon2.hash(password, {
                type: argon2.argon2id,
                memoryCost: 2 ** 16,
                timeCost: 4,
                parallelism: 6,
                hashLength: 100
            });
        } catch (error) {
            return Promise.reject(error);
        }
    }

    public static async validatePassword (hash : string, password : string) {
        try {
            if (hash.startsWith("$argon2")) {
                return argon2.verify(hash, password);
            }
        } catch (error) {
            return Promise.reject(error);
        }
        return Promise.reject();
    }
}

module.exports = Authentication;