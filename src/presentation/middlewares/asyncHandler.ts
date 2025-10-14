import { Request, Response, NextFunction, RequestHandler } from 'express';

export function asyncHandler(controller: RequestHandler): RequestHandler {
    
    return function (req: Request, res: Response, next: NextFunction) {
        Promise
            .resolve(controller(req, res, next))
            .catch(next);
    }

}
