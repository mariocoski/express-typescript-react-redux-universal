import { env } from '../utils';
export default {
  mailgun_domain: env('MAILGUN_DOMAIN'),
  mailgun_api_key: env('MAILGUN_API_KEY')
};