import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const addComment = async (req: Request, res: Response) => {
  const postId: number = parseInt(req.params.postId);
  const comment: string = req.body.content;
  const jwtSecret = process.env.JWT_SECRET as string;
  const token = req.body.token as string;

  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    jwt.verify(token, jwtSecret, async (err: any, data: any) => {
      if (err) {
        return res.status(401).json({ message: 'Token is not valid' });
      }

      const createdComment = await prisma.comment.create({
        data: {
          content: comment,
          postId: postId,
          userId: parseInt(data.id),
        },
      });

      return res
        .status(201)
        .json({ msg: 'created', createdComment: createdComment });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getComments = async (req: Request, res: Response) => {
  const postId: number = parseInt(req.params.postId);

  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const comments = await prisma.comment.findMany({
      where: {
        postId: postId,
      },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });

    if (comments.length == 0) return res.json({ msg: ['no comments'] });

    return res.status(200).json({ msg: 'Comments Found', comments: comments });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  const commentId: number = parseInt(req.params.id);
  const jwtSecret = process.env.JWT_SECRET as string;
  const token = req.body.token as string;

  try {
    jwt.verify(token, jwtSecret, async (err: any, data: any) => {
      if (err) {
        return res.status(401).json({ message: 'Token is not valid' });
      }

      if (data.role !== 'ADMIN') {
        return res.status(403).json({ msg: 'Forbidden' });
      }

      const deletedComment = await prisma.comment.findUnique({
        where: {
          id: commentId,
        },
      });

      return res
        .status(201)
        .json({ msg: 'created', deletedComment: deletedComment });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
