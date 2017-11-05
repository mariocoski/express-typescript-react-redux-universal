import * as validator from 'express-validator/check';
import { EMAIL_IS_REQUIRED, EMAIL_IS_INVALID, 
         PASSWORD_IS_REQUIRED, PASSWORD_IS_TOO_SHORT
         } from '../constants/errors';

export default [
  validator.check('email',EMAIL_IS_REQUIRED).exists(),
  validator.check('email',EMAIL_IS_INVALID).isEmail().trim().normalizeEmail(),
  validator.check('password', PASSWORD_IS_REQUIRED).exists(),
  validator.check('password', PASSWORD_IS_TOO_SHORT).isLength({ min: 6 }),
  validator.check('first_name').trim(),
  validator.check('last_name').trim(),
  validator.check('bio').trim()
];