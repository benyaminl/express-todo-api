import { Request, Response, NextFunction } from 'express';
import { APIResponse } from '../response/api-response';

export const DefaultStatusMiddleware = (req: Request, res: Response, next: NextFunction) => {
    res.status(404);
    res.send(new APIResponse("No Such route found", false));
}