import sgMail, { MailDataRequired } from '@sendgrid/mail';

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY as string;

sgMail.setApiKey(SENDGRID_API_KEY);

export const sendConfirmEmail = async (mail: MailDataRequired) => {
  try {
    await sgMail.send(mail);
    console.log('Email sent successfully');
    return true;
  } catch (error) {
    console.log(error);
  }
};
