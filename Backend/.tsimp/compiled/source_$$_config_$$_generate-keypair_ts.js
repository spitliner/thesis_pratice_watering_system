import process from 'node:process';
import fs from 'node:fs';
import crypto from 'node:crypto';
import dotenv from 'dotenv';
dotenv.config();
const { publicKey, privateKey } = crypto.generateKeyPairSync('ed25519', {
    publicKeyEncoding: {
        type: 'spki',
        format: 'pem',
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
        cipher: 'aes-256-cbc',
        passphrase: String(process.env.KEY_PASS),
    }
});
fs.writeFileSync('./privateKey.pem', privateKey);
fs.writeFileSync('./publicKey.pem', publicKey);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGUta2V5cGFpci5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9hcDEvRGVza3RvcC9UaGVzaXMvdGhlc2lzX3ByYXRpY2Vfd2F0ZXJpbmdfc3lzdGVtL0JhY2tlbmQvc291cmNlLyIsInNvdXJjZXMiOlsiY29uZmlnL2dlbmVyYXRlLWtleXBhaXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxPQUFPLE1BQU0sY0FBYyxDQUFDO0FBQ25DLE9BQU8sRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUN6QixPQUFPLE1BQU0sTUFBTSxhQUFhLENBQUM7QUFDakMsT0FBTyxNQUFNLE1BQU0sUUFBUSxDQUFDO0FBRTVCLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUVoQixNQUFNLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBQyxHQUFHLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLEVBQUU7SUFDbEUsaUJBQWlCLEVBQUU7UUFDZixJQUFJLEVBQUUsTUFBTTtRQUNaLE1BQU0sRUFBRSxLQUFLO0tBQ2hCO0lBQ0Qsa0JBQWtCLEVBQUU7UUFDaEIsSUFBSSxFQUFFLE9BQU87UUFDYixNQUFNLEVBQUUsS0FBSztRQUNiLE1BQU0sRUFBRSxhQUFhO1FBQ3JCLFVBQVUsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUM7S0FDM0M7Q0FBQyxDQUFDLENBQUM7QUFFUixFQUFFLENBQUMsYUFBYSxDQUFDLGtCQUFrQixFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQ2pELEVBQUUsQ0FBQyxhQUFhLENBQUMsaUJBQWlCLEVBQUUsU0FBUyxDQUFDLENBQUMifQ==