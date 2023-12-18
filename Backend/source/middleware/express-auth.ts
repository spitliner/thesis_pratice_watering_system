import type {Request, Response, NextFunction} from 'express';
import typia from 'typia';
import authentication from './auth.js';

async function authRequest(request: Request, response: Response, next: NextFunction) {
    const uid: unknown = request.cookies.uid;
    const tokenType: unknown = request.cookies.tokenType;

    if (!typia.is<string>(uid) || !typia.is<string>(tokenType)) {
        return response.status(401).json({error: 'unauthenticated request'});
    }

    if (undefined === request.headers.authorization) {
        return response.status(401).json({error: 'unauthenticated request'});
    }

    const bearerToken = request.headers.authorization.split(' ');
    if ('Bearer' !== bearerToken[0] || 2 !== bearerToken.length) {
        return response.status(401).json({error: 'wrong token format'});
    }

    const payload = await authentication.verifyToken(bearerToken[1]);
    if (undefined !== payload.error || undefined === payload.uid) {
        return response.status(403).json({error: 'expired or invalid token'});
    }

    if (uid !== payload.uid || 'jwt' !== tokenType) {
        return response.status(403).json({error: 'expired or invalid token'});
    }

    next();
}

export default authRequest;
