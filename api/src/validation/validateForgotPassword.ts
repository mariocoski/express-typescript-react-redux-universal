import * as validator from 'express-validator/check';
import { EMAIL_IS_REQUIRED, EMAIL_IS_INVALID} from '../constants/errors';

export default [
  validator.check('email',EMAIL_IS_REQUIRED).exists(),
  validator.check('email',EMAIL_IS_INVALID).isEmail().trim().normalizeEmail()
];