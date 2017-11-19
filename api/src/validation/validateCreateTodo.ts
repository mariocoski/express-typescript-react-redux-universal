import * as validator from 'express-validator/check';
import {TITLE_IS_REQUIRED } from '../constants/errors';

export default [
  validator.check('title',TITLE_IS_REQUIRED).exists().trim(),
  validator.check('description').trim()
];