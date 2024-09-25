import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken'

export const login = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    'local',
    { session: false },
    (err: any, user: any, info: any) => {
      if (err || !user) {
        return res.status(400).json({
            msg: `something went wrong: ${err}`,
            user: user,
            info: `${info.message}`
        })
      }
      req.logIn(user, { session: false }, (err)=>{
        if(err){
            next(err)
            return res.json({err: err})
        }

        const jwtSecret : string = process.env.JWT_SECRET as string;
        const token = jwt.sign(user, jwtSecret);
        return res.json({user, token});
      })
    })(req, res, next);
};