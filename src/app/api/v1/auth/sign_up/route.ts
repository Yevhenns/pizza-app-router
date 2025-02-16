import { NextResponse } from 'next/server';

import { createJwt, createVerifyJwt } from '@/helpers/auth/createJwt';
// import { sendConfirmEmail } from '@/helpers/auth/sendConfirmEmail';
import { createUserWithEmail } from '@/lib/createUserWithEmail';
import nodemailer from 'nodemailer';

// const OWNER_EMAIL = process.env.OWNER_EMAIL as string;
const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;
const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://nostrra-pizzza.vercel.app';

export async function POST(request: Request) {
  const body: Auth = await request.json();

  const verificationToken = createVerifyJwt();

  try {
    const createdUser = await createUserWithEmail(body, verificationToken);

    const { _id, picture, name, email, phoneNumber, role } = createdUser;

    const userInfo = { userId: _id, role: role };

    const token = createJwt(userInfo);

    const user = {
      _id,
      picture,
      name,
      email,
      phoneNumber,
      role,
    };

    // nodemailer
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
      subject: 'Verify your email',
      html: `<p>Для підтвердження email <a href=${BASE_URL}/verify/${verificationToken}>клікніть тут</a>.</p>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
    // nodemailer

    // const mail = {
    //   to: email,
    //   from: OWNER_EMAIL,
    //   subject: 'Verify email',
    //   html: `<a href="http://localhost:3000/api/users/verify/${verificationToken}" target="_blank">Verify email</a>`,
    // };
    // await sendConfirmEmail(mail);

    return NextResponse.json({ message: 'Token received', token, user });
  } catch (e: any) {
    console.error(e);

    return NextResponse.json(
      { error: e.error || 'Invalid request' },
      { status: e.status || 400 }
    );
  }
}
