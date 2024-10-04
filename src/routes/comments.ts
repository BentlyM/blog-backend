import {Router } from "express";
import { verifyToken } from "../middleware/verifyToken";
import { addComment, deleteComment, getComments } from "../controllers/commentsControllers";
import { commentSanitization } from "../misc/validation";

const router = Router();

router.post('/api/posts/:postId/comments', verifyToken , commentSanitization(), addComment);
router.get('/api/posts/:postId/comments', getComments);
router.delete('/api/comments/:id', verifyToken, deleteComment);

export default router;