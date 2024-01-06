import process from 'node:process';
import fs from 'node:fs';
import crypto from 'node:crypto';
import dotenv from 'dotenv';

dotenv.config();

const privateKey = crypto.createPrivateKey({key: fs.readFileSync('./privateKey.pem', {encoding: 'utf8'}), passphrase: String(process.env.KEY_PASS)});
const publicKey = crypto.createPublicKey(fs.readFileSync('./publicKey.pem', {encoding: 'utf8'}));

export {privateKey, publicKey};
