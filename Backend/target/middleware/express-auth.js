import typia from 'typia';
import authentication from './auth.js';
async function authRequest(request, response, next) {
    const uid = request.cookies.uid;
    const tokenType = request.cookies.tokenType;
    if (!(input => {
        return "string" === typeof input;
    })(uid) || !(input => {
        return "string" === typeof input;
    })(tokenType)) {
        return response.status(401).json({ error: 'unauthenticated request' });
    }
    if (undefined === request.headers.authorization) {
        return response.status(401).json({ error: 'unauthenticated request' });
    }
    const bearerToken = request.headers.authorization.split(' ');
    if ('Bearer' !== bearerToken[0] || 2 !== bearerToken.length) {
        return response.status(401).json({ error: 'wrong token format' });
    }
    const payload = await authentication.verifyToken(bearerToken[1]);
    if (undefined !== payload.error || undefined === payload.uid) {
        return response.status(403).json({ error: 'expired or invalid token' });
    }
    if (uid !== payload.uid || 'jwt' !== tokenType) {
        return response.status(403).json({ error: 'expired or invalid token' });
    }
    next();
}
export default authRequest;
//# sourceMappingURL=express-auth.js.map