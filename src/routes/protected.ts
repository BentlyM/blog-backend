import { protect } from "../controllers/protectedController";
import {Router } from "express";
import { verifyToken } from "../middleware/verifyToken";

const router = Router();

router.post('/api/protected', verifyToken, protect);

export default router;