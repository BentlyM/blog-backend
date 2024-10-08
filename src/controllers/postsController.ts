import { NextFunction, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const posts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const posts = await prisma.post.findMany({
    include: {
      author: {
        select: {
          username: true,
        },
      },
      comments: true,
    },
  });

  res.json(posts);
};

export const getUniquePost = async (req: Request, res: Response) => {
  const postId: number = parseInt(req.params.id);

  if (Number.isNaN(postId)) return res.sendStatus(400);

  if (typeof postId !== 'undefined') {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        author: {
          select: {
            username: true,
          },
        },
        comments: {
          select: {
            user: {
              select: {
                id: false,
                username: true,
                password: false,
                role: false,
              },
            },
            content: true,
            createdAt: true,
          },
        },
      },
    });

    return res.json(post ? post : { msg: 'Post Not Found' });
  }

  res.sendStatus(304);
};

export const postPosts = (req: Request, res: Response) => {
  const jwtSecret = process.env.JWT_SECRET as string;
  const token = req.body.token as string;
  const { title, content }: { title: string; content: string } = req.body;

  jwt.verify(token, jwtSecret, async (err: any, data: any) => {
    if (err) {
      console.error(err);

      return res.status(403).json({ msg: 'Invalid token' });
    }

    if (data.role !== 'ADMIN') {
      return res.status(403).json({ msg: 'Forbidden' });
    }

    if (!title || !content)
      return res.status(200).json({ msg: 'missing credentials' });

    const post = await prisma.post.create({
      data: {
        title,
        content,
        author: {
          connect: {
            id: parseInt(data.id),
          },
        },
      },
    });

    return res.status(201).json({ msg: 'created', post: post });
  });
};

export const updateUniquePost = async (req: Request, res: Response) => {
  const postId = parseInt(req.params.id);
  const title: string | undefined = req.body.title;
  const msg: string | undefined = req.body.content;
  const published: boolean = req.body.published;

  if (Number.isNaN(postId)) return res.sendStatus(400);

  const updateData: { title?: string; content?: string; published?: boolean } =
    {
      ...(title && { title }), // Conditionally include title
      ...(msg && { content: msg }), // Conditionally include content
      ...(typeof published === 'boolean' && {published}),
    };

  try {
    const jwtSecret = process.env.JWT_SECRET as string;
    const token = req.body.token as string;

    jwt.verify(token, jwtSecret, async (err: any, data: any) => {
      if (err) {
        console.error(err);

        return res.status(403).json({ msg: 'Invalid token' });
      }

      const uniquePost = await prisma.post.update({
        where: {
          id: postId, 
          authorId: data.id,
        },
        data: updateData,
      });

      return res.status(200).json({ msg: 'updated', post: uniquePost });
    });
  } catch (err) {
    return res.status(500).json({ err: 'Failed to update post' });
  }
};

export const deleteUniquePost = async (req: Request, res: Response) => {
  const postId = parseInt(req.params.id);

  if (Number.isNaN(postId)) return res.sendStatus(400);

  try {
    const jwtSecret = process.env.JWT_SECRET as string;
    const token = req.body.token as string;

    jwt.verify(token, jwtSecret, async (err: any, data: any) => {
      if (err) {
        console.error(err);

        return res.status(403).json({ msg: 'Invalid token' });
      }

      if (data.role !== 'ADMIN') {
        return res.status(403).json({ msg: 'Forbidden' });
      }

      try {
        const deletedPost = await prisma.post.delete({
          where: {
            id: postId,
            authorId: data.id,
          },
        });

        return res.status(200).json({ msg: 'deleted', post: deletedPost });
      } catch (e) {
        return res
          .status(404)
          .json({ err: `Post with id ${postId} does not exist` });
      }
    });
  } catch (e: any) {
    return res.status(500).json({ err: 'Failed to delete post', e });
  }
};
