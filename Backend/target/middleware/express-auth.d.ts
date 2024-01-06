import type { Request, Response, NextFunction } from 'express';
declare function authRequest(request: Request, response: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
export default authRequest;
//# sourceMappingURL=express-auth.d.ts.map