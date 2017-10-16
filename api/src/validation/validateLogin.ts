import { check, validationResult } from 'express-validator/check';
import { EMAIL_IS_REQUIRED, EMAIL_IS_INVALID, 
         PASSWORD_IS_REQUIRED, PASSWORD_IS_TOO_SHORT
         } from '../constants/errors';

export default [
  check('email',EMAIL_IS_REQUIRED).exists(),
  check('email',EMAIL_IS_INVALID).isEmail().trim().normalizeEmail(),
  check('password', PASSWORD_IS_REQUIRED).exists()
];