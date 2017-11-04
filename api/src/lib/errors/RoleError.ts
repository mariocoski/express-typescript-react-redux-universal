import BaseError from './BaseError';

export default class extends BaseError {
  constructor(roleName: string) {
    super(`Role ${roleName} is not defined`);
  }
}
