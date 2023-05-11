import { Request, Response, NextFunction } from 'express';
import {APIResponse} from '../response/api-response';

export const TestMiddleware = (req: Request, res: Response, next: NextFunction) => {
    let key = req.query.key;
    
    if (key == null) {
        res.statusCode = 403;
        res.send(new APIResponse("no key found", false));
        return;
    }

    next();
}