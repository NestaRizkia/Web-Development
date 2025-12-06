import express from 'express';
import { getContent, updateContent } from '../controllers/contentController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// GET /api/content (public)
router.get('/', getContent);

// PUT /api/content (protected)
router.put('/', requireAuth, updateContent);

export default router;
