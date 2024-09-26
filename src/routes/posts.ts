import { deleteUniquePost, getUniquePost, postPosts, posts, updateUniquePost } from "../controllers/postsController";
import {Router } from "express";
import { verifyToken } from "../middleware/verifyToken";

const router = Router();

router.get('/api/posts', posts);
router.get('/api/posts/:id', getUniquePost);
router.post('/api/posts', verifyToken , postPosts);
router.put('/api/posts/:id', verifyToken, updateUniquePost);
router.delete('/api/posts/:id', verifyToken , deleteUniquePost);

export default router;