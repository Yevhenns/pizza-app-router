import nodemailer from 'nodemailer';

interface SendEmailProps {
  body: string;
}

export async function sendEmail({ body }: SendEmailProps) {
  const email = process.env.EMAIL;
  const password = process.env.PASSWORD;

  if (!email || !password) {
    console.error('Email or password environment variables are not set');
    return;
  }

  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: email,
      pass: password,
    },
  });

  try {
    await transport.verify();
    await transport.sendMail({
      from: email,
      to: email,
      subject: 'Замовлення',
      html: body,
    });
  } catch (error) {
    console.log(error);
    return;
  }
}
