import BaseError from './BaseError';

export default class extends BaseError {
  constructor(roleName) {
    super(`Role ${roleName} is not defined`);
  }
}
