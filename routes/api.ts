import { Task } from "../models/task";

import express, {Request, Response} from 'express';
import { TodoCreateRequest } from "../requests/todo/create";
import { APIResponse } from "../response/api-response";

const router = express.Router();
export let api = router;

router.get('/todo', async (req: Request, res: Response) => {
    let data = await Task.findAll({
        attributes: ["id", "name", "createdAt", "updatedAt"]
    });
    res.send(data);
});

router.post('/todo', (req: Request, res: Response) => {
    let body = <TodoCreateRequest> req.body;
    
    let newTask = Task.build({
        name: body.name,
        user: body.username ?? "ben",
        content: body.content
    });

    newTask.save();

    res.send(new APIResponse("Success add task " + body.name));
});

router.get("/todo/:id", async (req: Request, res: Response) => {
    let id = req.params.id;
    let task = await Task.findOne({
        where: {
            id: id
        }
    });

    res.send(new APIResponse("Success", true, task));
});