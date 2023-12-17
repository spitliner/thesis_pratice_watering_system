import type {Request, Response, NextFunction} from 'express';
import typia from 'typia';
import authentication from './auth.js';

async function authRequest(request: Request, response: Response, next: NextFunction) {
    if (!typia.is<string>(request.cookies.uid) || !typia.is<string>(request.cookies.tokenType)) {
        return response.status(401).json({error: 'unauthenticated request'});
    }

    const uid = String(request.cookies.uid);
    const tokenType = String(request.cookies.tokenType);

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
