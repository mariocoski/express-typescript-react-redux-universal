import * as validator from 'express-validator/check';
import { PASSWORD_IS_REQUIRED, PASSWORD_IS_TOO_SHORT,
  PASSWORD_CONFIRMATION_MUST_MATCH_PASSWORD,  TOKEN_IS_REQUIRED} from '../constants/errors';

export default [
  validator.check('token',TOKEN_IS_REQUIRED).exists().trim(),
  validator.check('password', PASSWORD_IS_REQUIRED).exists(),
  validator.check('password', PASSWORD_IS_TOO_SHORT).isLength({ min: 6 }),
  validator.check('password_confirmation', PASSWORD_CONFIRMATION_MUST_MATCH_PASSWORD)
  .exists()
  .custom((value, { req }) => value === req.body.password)
];