import { NextFunction, Request, Response } from "express"

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    try{
        const bearerHeader = req.headers['authorization'];
        if(typeof bearerHeader !== 'undefined'){
            
            const bearer = bearerHeader.split(' ');

            const bearerToken = bearer[1];

            req.body.token = bearerToken;

            next();
        }else{
            return res.sendStatus(403);
        }
    }catch(e){
        return next(e);
    }
}

