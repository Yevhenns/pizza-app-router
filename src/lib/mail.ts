import handlebars from 'handlebars';
import nodemailer from 'nodemailer';

import { orderTemplate } from './orderTemplate';

interface SendEmailProps {
  body: string;
}

interface compileOrderTemplateProps {
  name: string;
  number: string;
  comment?: string;
  address?: string;
  orderSum: number;
  order: Ordered;
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

export function compileOrderTemplate({
  name,
  number,
  address,
  comment,
  orderSum,
  order,
}: compileOrderTemplateProps) {
  const template = handlebars.compile(orderTemplate);
  const htmlBody = template({
    name,
    number,
    address,
    comment,
    orderSum,
    order,
  });
  return htmlBody;
}
