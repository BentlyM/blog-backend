import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// const posts = (req: Request, res: Response, next: NextFunction) => {
//     const jwtSecret = process.env.JWT_SECRET as string;
//     const token = req.body.token as string;

//     jwt.verify(token, jwtSecret, (err: any, data: any)=>{
//         if(err){
//             res.sendStatus(403);
//         }else{
//             res.json({
//                 msg: 'this route is protected...',
//                 data
//             })
//         }
//     });
// }

export const posts = async (req: Request, res: Response, next: NextFunction) => {
    const posts = await prisma.post.findMany();

    res.json({posts});
}
