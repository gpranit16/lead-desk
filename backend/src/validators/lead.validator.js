import { body, param, query } from 'express-validator';
import { validate } from './validate.js';

export const createLeadValidator = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Lead name is required')
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters long'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Lead email is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  body('budget')
    .notEmpty()
    .withMessage('Budget is required')
    .isNumeric()
    .withMessage('Budget must be a valid number')
    .custom(val => val >= 0)
    .withMessage('Budget cannot be negative'),
  body('message')
    .optional()
    .trim()
    .isString()
    .withMessage('Message must be a string'),
  validate
];

export const updateStatusValidator = [
  param('id')
    .isMongoId()
    .withMessage('Invalid lead ID format'),
  body('status')
    .notEmpty()
    .withMessage('Status is required')
    .isIn(['New', 'Contacted', 'Closed'])
    .withMessage('Status must be one of: New, Contacted, Closed'),
  validate
];

export const leadIdParamValidator = [
  param('id')
    .isMongoId()
    .withMessage('Invalid lead ID format'),
  validate
];

export const getLeadsQueryValidator = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  query('status')
    .optional()
    .isIn(['New', 'Contacted', 'Closed'])
    .withMessage('Status must be one of: New, Contacted, Closed'),
  query('search')
    .optional()
    .trim()
    .isString(),
  validate
];
