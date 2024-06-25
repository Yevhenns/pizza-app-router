import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import { orderTemplate } from './orderTemplate';

interface SendEmailProps {
  body: string;
}

export async function sendEmail({ body }: SendEmailProps) {
  const email = process.env.EMAIL;
  const password = process.env.PASSWORD;

  // if (req !== undefined) {
  //   const result = await JSON.parse(req.body.body);

  //   const items = result.order.map(item => item);

  // const summaryInfo = {
  //   name: result.customerInfo.name,
  //   number: result.customerInfo.number,
  //   comment: result.customerInfo.comment,
  //   address: result.customerInfo.address,
  //   items,
  //   sum: result.orderSum,
  // };

  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: email,
      pass: password,
    },
  });

  try {
    const testResult = await transport.verify();
    console.log(testResult);
  } catch (error) {
    console.log(error);
    return;
  }

  try {
    const sendResult = await transport.sendMail({
      from: email,
      to: email,
      subject: 'Замовлення',
      html: body,
    });
    console.log(sendResult);
  } catch (error) {
    console.log(error);
  }

  // const handlebarOptions = {
  //   viewEngine: {
  //     partialsDir: path.resolve('./src/views/'),
  //     defaultLayout: false,
  //   },
  //   viewPath: path.resolve('./src/views/'),
  // };

  // transport.use('compile', hbs(handlebarOptions));

  // const mailOptions = {
  //   from: email,
  //   to: email,
  //   subject: 'Замовлення',
  //   template: 'email',
  //   context: {
  //     data: summaryInfo,
  //   },
  // };

  // transport.sendMail(mailOptions, function (error, info) {
  //   if (error) {
  //     console.log(error.message, 'error');
  //   } else {
  //     console.log('mail sent', info);
  //     res.status(201).json({
  //       status: 'success',
  //       code: 201,
  //       data: result,
  //     });
  //   }
  // });
  // }
}

interface compileOrderTemplateProps {
  name: string;
  // number: string;
  // comment: string;
  // address: string;
  // sum: number;
}

export function compileOrderTemplate({ name }: compileOrderTemplateProps) {
  const template = handlebars.compile(orderTemplate);
  const htmlBody = template({
    name,
  });
  return htmlBody;
}
