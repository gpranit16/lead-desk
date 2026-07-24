import express from 'express';
import { login } from '../controllers/auth.controller.js';
import { loginValidator } from '../validators/auth.validator.js';

const router = express.Router();

// POST /api/auth/login
router.post('/login', loginValidator, login);

export default router;
