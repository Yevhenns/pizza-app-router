import { BASE_URL } from '@/assets/variables';
import nodemailer from 'nodemailer';

const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;

export async function sendVerifyEmail(
  email: string,
  verificationToken: string
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
    subject: 'Підтвердження email',
    html: `<p>Для підтвердження email <a href=${BASE_URL}/verify/${verificationToken}>клікніть тут</a>.</p>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Помилка надсилання email:', error);
    throw new Error('Не вдалося надіслати лист');
  }
}
