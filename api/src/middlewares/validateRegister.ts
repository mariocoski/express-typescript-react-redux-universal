import { Request, Response, NextFunction} from 'express';
import { check, validationResult } from 'express-validator/check';
import {EMAIL_IS_REQUIRED} from '../constants/errors';

export default [
    check('email','Email is required').exists(),
    check('email',"Email is invalid").isEmail().trim().normalizeEmail(),
    check('password', 'Password is required').exists(),
    check('password', 'passwords must be at least 6 chars long and contain one number')
      .isLength({ min: 8 })
      .matches(/\d/)
];