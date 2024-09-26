import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

export const protect = (req: Request, res: Response, next: NextFunction) => {
    const jwtSecret = process.env.JWT_SECRET as string;
    const token = req.body.token as string;

    jwt.verify(token, jwtSecret, (err: any, data: any)=>{
        if(err){
            res.sendStatus(403);
        }else{
            res.json({
                msg: 'this route is protected...',
                data
            })
        }
    });
}
