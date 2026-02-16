import { Router } from 'express';
import { authController } from './auth.controller';

const router = Router();

// https://localhost:3001/auth/login
router.post('/login', authController.loginUser);

// Here I re-assignened value
export const authRouters = router;
