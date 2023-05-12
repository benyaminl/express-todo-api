import express, { Request, Response, Router } from 'express'

import jwt from 'jsonwebtoken';
import { expressjwt as jwtCheck, Request as JWTRequest } from "express-jwt";

import { LoginRequest } from '../requests/auth/login';
import { APIResponse } from '../response/api-response';

const router = express.Router();

export let auth = router;

auth.post("/login", (req: Request, res: Response) => {
    let body = <LoginRequest> req.body;
    if (body.user == "admin" && body.pass == "admin")
    {
        let response = jwt.sign({user: "admin", role: "admin"}, "abc", {
            algorithm: "HS256",
            expiresIn: "2h",
            audience: "admin"
        });

        res.send(response);
        return;
    }

    res.statusCode = 403;
    res.send(new APIResponse("User or pass wrong", false));
});

auth.get("/test", jwtCheck({ secret: "abc", algorithms: ["HS256"] }),
    function (req: JWTRequest, res) {
        console.log();
        let aud = req.auth?.aud ?? "";
        if (aud != "admin") return res.sendStatus(401);
        res.send(new APIResponse("Success"));
});