import config from '../config/main';
import * as mailgunService from "mailgun-js";
const mg: Mailgun.Mailgun = mailgunService({apiKey: config.mailgun_api_key, domain: config.mailgun_domain});

export async function sendEmail(data: Mailgun.messages.SendData,mailgun: Mailgun.Mailgun = mg){
  return mailgun.messages().send(data);
}
