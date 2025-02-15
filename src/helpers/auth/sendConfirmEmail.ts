import sgMail, { MailDataRequired } from '@sendgrid/mail';

export const sendConfirmEmail = async (mail: MailDataRequired) => {
  const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY as string;
  console.log(SENDGRID_API_KEY);

  sgMail.setApiKey(SENDGRID_API_KEY);
  try {
    await sgMail.send(mail);
    console.log('Email sent successfully');
    return true;
  } catch (error) {
    console.log(error);
  }
};
