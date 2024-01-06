import * as jose from 'jose';
declare const authentication: {
    hashPassword(password: string): Promise<string>;
    verifyPassword(password: string, hash: string): Promise<boolean>;
    createToken(payload: Record<string, unknown>): Promise<string>;
    verifyToken(token: string): Promise<jose.JWTPayload>;
};
export default authentication;
//# sourceMappingURL=auth.d.ts.map