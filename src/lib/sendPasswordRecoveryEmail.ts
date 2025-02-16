import nodemailer from 'nodemailer';

const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;

export async function sendPasswordRecoveryEmail(
  email: string,
  password: string
) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL,
      pass: PASSWORD,
    },
  });

  const mailOptions = {
    from: EMAIL,
    to: email,
    subject: 'Відновлення паролю',
    html: `<p>Ваш новий пароль ${password}</p>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Помилка надсилання email:', error);
    throw new Error('Не вдалося надіслати лист');
  }
}
