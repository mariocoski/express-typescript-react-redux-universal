
export async function sendEmail(data: Mailgun.messages.SendData,mailgun: Mailgun.Mailgun){
  return mailgun.messages().send(data);
}
