import express from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import { roleCheck } from '../middleware/roleCheck.js';
import { 
  getUserStrategies, 
  createStrategy, 
  getStrategyById, 
  updateStrategy, 
  deleteStrategy,
  toggleStrategyRunning,
  startStrategy,
  stopStrategy,
  activateStrategy,
  deactivateStrategy,
  toggleFavorite,
  getMarketplaceStrategies,
  getAllStrategies 
} from '../controllers/strategyController.js';
import { 
  createStrategyValidation, 
  idParamValidation,
  paginationValidation
} from '../middleware/validation.js';

const router = express.Router();

// Public routes
router.get('/marketplace', paginationValidation, getMarketplaceStrategies);

// User strategy routes
router.get('/', authenticate, paginationValidation, getUserStrategies);
router.post('/', authenticate, createStrategyValidation, createStrategy);
router.get('/:id', authenticate, idParamValidation, getStrategyById);
router.put('/:id', authenticate, idParamValidation, createStrategyValidation, updateStrategy);
router.delete('/:id', authenticate, idParamValidation, deleteStrategy);
router.post('/:id/toggle-running', authenticate, idParamValidation, toggleStrategyRunning);
router.post('/:id/toggle-favorite', authenticate, idParamValidation, toggleFavorite);
router.post('/:id/start', authenticate, idParamValidation, startStrategy);
router.post('/:id/stop', authenticate, idParamValidation, stopStrategy);
router.post('/:id/activate', authenticate, idParamValidation, activateStrategy);
router.post('/:id/deactivate', authenticate, idParamValidation, deactivateStrategy);

// Admin routes
router.get('/admin/all', authenticate, roleCheck(['Admin']), getAllStrategies);

export default router;