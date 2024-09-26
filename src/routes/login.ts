import { Router } from "express";
import { login } from "../controllers/loginController";
import { credentialValidators } from "../misc/validation";

const router = Router();

router.post('/api/users/login', credentialValidators(), login);

export default router;