import { Router } from "express";
import { register } from "../controllers/registerController";
import { credentialValidators } from "../misc/validation";

const router = Router();

router.post('/api/users/register', credentialValidators(), register);

export default router;