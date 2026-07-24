import { authenticateUser } from '../services/auth.service.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

/**
 * @desc    Admin login & get JWT token
 * @route   POST /api/auth/login
 * @access  Public
 */
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    const authData = await authenticateUser(email, password);
    return successResponse(res, 200, 'Login successful', authData);
  } catch (error) {
    return errorResponse(res, 401, error.message, { details: 'Invalid credentials' });
  }
});
