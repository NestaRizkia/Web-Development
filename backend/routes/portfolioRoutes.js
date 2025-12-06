import express from 'express';
import {
  getAllPortfolio,
  getPortfolioById,
  createPortfolio,
  updatePortfolio,
  deletePortfolio
} from '../controllers/portfolioController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// GET /api/portfolio (public)
router.get('/', getAllPortfolio);

// GET /api/portfolio/:id (public)
router.get('/:id', getPortfolioById);

// POST /api/portfolio (protected)
router.post('/', requireAuth, createPortfolio);

// PUT /api/portfolio/:id (protected)
router.put('/:id', requireAuth, updatePortfolio);

// DELETE /api/portfolio/:id (protected)
router.delete('/:id', requireAuth, deletePortfolio);

export default router;
