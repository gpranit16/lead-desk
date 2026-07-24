/**
 * Standardized API Response utilities for LeadDesk Pro
 */

export const successResponse = (res, statusCode = 200, message = 'Success', data = {}) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data
  });
};

export const errorResponse = (res, statusCode = 500, message = 'An error occurred', error = {}) => {
  return res.status(statusCode).json({
    success: false,
    message,
    error: typeof error === 'string' ? { details: error } : error
  });
};
