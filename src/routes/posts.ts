import { posts } from "../controllers/postsController";
import {Router } from "express";

const router = Router();

router.get('/api/posts', posts);

export default router;