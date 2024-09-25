import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { validationResult } from 'express-validator';

const prisma = new PrismaClient();

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    email,
    username,
    password,
  }: { email: string; username: string; password: string } = req.body;
  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        return res.status(400).json({
            success: false,
            errors: errors.array()
        })
    }

    if (existingUser) {
      if (existingUser.username === username) {
        throw new Error('Username already exist.');
      }
      if (existingUser.email === email) {
        throw new Error('Email already exist');
      }
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
        data: {
            username,
            email,
            password: hashPassword,
        }
    })

    res.status(200).json({success: true, msg: 'REGISTER SUCCESSFUL'});
  } catch (e) {
    res.status(500).json({ err: `${e}` });
  }
};
