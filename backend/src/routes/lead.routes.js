import express from 'express';
import {
  createLead,
  getLeads,
  getLeadById,
  updateLeadStatus,
  deleteLead,
  getLeadStats
} from '../controllers/lead.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import {
  createLeadValidator,
  updateStatusValidator,
  leadIdParamValidator,
  getLeadsQueryValidator
} from '../validators/lead.validator.js';

const router = express.Router();

// Public route: Submit a lead
router.post('/', createLeadValidator, createLead);

// Admin protected routes below
router.use(protect);

// Dashboard Statistics route (must precede /:id parameter route)
router.get('/stats', getLeadStats);

// List all leads with search, filter, and pagination
router.get('/', getLeadsQueryValidator, getLeads);

// Get lead by ID
router.get('/:id', leadIdParamValidator, getLeadById);

// Update lead status
router.patch('/:id/status', updateStatusValidator, updateLeadStatus);

// Soft delete lead
router.delete('/:id', leadIdParamValidator, deleteLead);

export default router;
