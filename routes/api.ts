import { Task } from "../models/task";

import express, {Request, Response} from 'express';
import { TodoCreateRequest } from "../requests/todo/create";

const router = express.Router();
export function api() { return router };

router.get('/todo', async (req: Request, res: Response) => {
    let data = await Task.findAll();
    res.send(data);
});

router.post('/todo', (req: Request, res: Response) => {
    let body = <TodoCreateRequest>req.body;
    
    res.send(body.name);
});