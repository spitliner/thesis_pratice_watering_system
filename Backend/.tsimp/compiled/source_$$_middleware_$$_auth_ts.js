import crypto from 'node:crypto';
import argon2 from 'argon2';
import * as jose from 'jose';
import { privateKey, publicKey } from '../config/load-keypair.js';
const authentication = {
    async hashPassword(password) {
        return argon2.hash(password, {
            type: argon2.argon2id,
            hashLength: 100,
            timeCost: 4,
        });
    },
    async verifyPassword(password, hash) {
        return argon2.verify(hash, password);
    },
    async createToken(payload) {
        payload.padding = crypto.randomBytes(48).toString('base64');
        return new jose.SignJWT(payload)
            .setProtectedHeader({ alg: 'EdDSA' }) // Ed25519
            .setExpirationTime('12h')
            .setNotBefore('0.1s')
            .sign(privateKey);
    },
    async verifyToken(token) {
        try {
            const { payload, protectedHeader } = await jose.jwtVerify(token, publicKey, {
                algorithms: ['EdDSA'],
            });
            return payload;
        }
        catch (error) {
            console.log(error);
            return {
                error: 'invalid token',
            };
        }
    },
};
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
export default authentication;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9hcDEvRGVza3RvcC9UaGVzaXMvdGhlc2lzX3ByYXRpY2Vfd2F0ZXJpbmdfc3lzdGVtL0JhY2tlbmQvc291cmNlLyIsInNvdXJjZXMiOlsibWlkZGxld2FyZS9hdXRoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sTUFBTSxNQUFNLGFBQWEsQ0FBQztBQUNqQyxPQUFPLE1BQU0sTUFBTSxRQUFRLENBQUM7QUFDNUIsT0FBTyxLQUFLLElBQUksTUFBTSxNQUFNLENBQUM7QUFDN0IsT0FBTyxFQUFDLFVBQVUsRUFBRSxTQUFTLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUVoRSxNQUFNLGNBQWMsR0FBRztJQUNuQixLQUFLLENBQUMsWUFBWSxDQUFDLFFBQWdCO1FBQy9CLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDekIsSUFBSSxFQUFFLE1BQU0sQ0FBQyxRQUFRO1lBQ3JCLFVBQVUsRUFBRSxHQUFHO1lBQ2YsUUFBUSxFQUFFLENBQUM7U0FDZCxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsS0FBSyxDQUFDLGNBQWMsQ0FBQyxRQUFnQixFQUFFLElBQVk7UUFDL0MsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRUQsS0FBSyxDQUFDLFdBQVcsQ0FBQyxPQUFnQztRQUM5QyxPQUFPLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzVELE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQzthQUMzQixrQkFBa0IsQ0FBQyxFQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUMsQ0FBQyxDQUFDLFVBQVU7YUFDN0MsaUJBQWlCLENBQUMsS0FBSyxDQUFDO2FBQ3hCLFlBQVksQ0FBQyxNQUFNLENBQUM7YUFDcEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFRCxLQUFLLENBQUMsV0FBVyxDQUFDLEtBQWE7UUFDM0IsSUFBSSxDQUFDO1lBQ0QsTUFBTSxFQUFDLE9BQU8sRUFBRSxlQUFlLEVBQUMsR0FBRyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRTtnQkFDdEUsVUFBVSxFQUFFLENBQUMsT0FBTyxDQUFDO2FBQ3hCLENBQUMsQ0FBQztZQUNILE9BQU8sT0FBTyxDQUFDO1FBQ25CLENBQUM7UUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1lBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNuQixPQUFPO2dCQUNILEtBQUssRUFBRSxlQUFlO2FBQ3pCLENBQUM7UUFDTixDQUFDO0lBQ0wsQ0FBQztDQUNKLENBQUM7QUFFRjs7Ozs7Ozs7O0VBU0U7QUFDRixlQUFlLGNBQWMsQ0FBQyJ9