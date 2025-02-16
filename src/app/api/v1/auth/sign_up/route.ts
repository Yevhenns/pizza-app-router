import { NextResponse } from 'next/server';

import { createJwt, createVerifyJwt } from '@/helpers/auth/createJwt';
// import { sendConfirmEmail } from '@/helpers/auth/sendConfirmEmail';
import { createUserWithEmail } from '@/lib/createUserWithEmail';
import { sendVerifyEmail } from '@/lib/sendVerifyEmail';
import nodemailer from 'nodemailer';

// const OWNER_EMAIL = process.env.OWNER_EMAIL as string;

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

    try {
      await sendVerifyEmail(email, verificationToken);
    } catch (e: any) {
      throw { status: 500, error: 'Не вдалося надіслати лист' };
    }

    return NextResponse.json({ message: 'Token received', token, user });
  } catch (e: any) {
    console.error(e);

    return NextResponse.json(
      { error: e.error || 'Invalid request' },
      { status: e.status || 400 }
    );
  }
}
