import BaseError from './BaseError';

export default class extends BaseError {
  constructor() {
    super('Bad request');
  }
}
