import express from 'express';
import { login, verify, logout } from '../controllers/authController.js';

const router = express.Router();

// POST /api/auth/login
router.post('/login', login);

// GET /api/auth/verify
router.get('/verify', verify);

// POST /api/auth/logout
router.post('/logout', logout);

export default router;
