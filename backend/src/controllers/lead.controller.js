import {
  createLeadService,
  getLeadsService,
  getLeadByIdService,
  updateLeadStatusService,
  softDeleteLeadService,
  getLeadStatsService
} from '../services/lead.service.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

/**
 * @desc    Submit a new lead (Public)
 * @route   POST /api/leads
 * @access  Public
 */
export const createLead = asyncHandler(async (req, res) => {
  const { name, email, budget, message } = req.body;
  const newLead = await createLeadService({ name, email, budget, message });
  return successResponse(res, 201, 'Lead submitted successfully', newLead);
});

/**
 * @desc    Get all leads with search, filter, and pagination
 * @route   GET /api/leads
 * @access  Admin (Protected)
 */
export const getLeads = asyncHandler(async (req, res) => {
  const result = await getLeadsService(req.query);
  return successResponse(res, 200, 'Leads retrieved successfully', result);
});

/**
 * @desc    Get single lead details by ID
 * @route   GET /api/leads/:id
 * @access  Admin (Protected)
 */
export const getLeadById = asyncHandler(async (req, res) => {
  const lead = await getLeadByIdService(req.params.id);
  if (!lead) {
    return errorResponse(res, 404, 'Lead not found');
  }
  return successResponse(res, 200, 'Lead details retrieved successfully', lead);
});

/**
 * @desc    Update lead status (New, Contacted, Closed)
 * @route   PATCH /api/leads/:id/status
 * @access  Admin (Protected)
 */
export const updateLeadStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const lead = await updateLeadStatusService(req.params.id, status);
  if (!lead) {
    return errorResponse(res, 404, 'Lead not found or already deleted');
  }
  return successResponse(res, 200, `Lead status updated to ${status}`, lead);
});

/**
 * @desc    Soft delete a lead
 * @route   DELETE /api/leads/:id
 * @access  Admin (Protected)
 */
export const deleteLead = asyncHandler(async (req, res) => {
  const lead = await softDeleteLeadService(req.params.id);
  if (!lead) {
    return errorResponse(res, 404, 'Lead not found or already deleted');
  }
  return successResponse(res, 200, 'Lead deleted successfully', { id: lead._id, isDeleted: true });
});

/**
 * @desc    Get dashboard metrics & lead status stats
 * @route   GET /api/leads/stats
 * @access  Admin (Protected)
 */
export const getLeadStats = asyncHandler(async (req, res) => {
  const stats = await getLeadStatsService();
  return successResponse(res, 200, 'Lead statistics retrieved successfully', stats);
});
