import { NextResponse } from 'next/server';

import { createVerifyJwt } from '@/helpers/auth/createJwt';
import { isValidEmail, isValidPassword } from '@/helpers/validation';
import dbConnect from '@/lib/dbConnect';
import { sendVerifyEmail } from '@/lib/sendVerifyEmail';
import User from '@/models/User';
import bcrypt from 'bcrypt';

async function findUser(payload: Auth): Promise<User> {
  await dbConnect();

  if (!isValidPassword(payload.password) || !isValidEmail(payload.email)) {
    throw { status: 400, error: 'Невірний email або пароль' };
  }

  const existingUser: User | null = await User.findOne({
    email: payload.email,
  });

  if (!existingUser) {
    throw { status: 404, error: 'Email не зареєстровано' };
  }

  const isPasswordValid = bcrypt.compareSync(
    payload.password,
    existingUser.password
  );

  if (!isPasswordValid) {
    throw { status: 401, error: 'Невірний пароль' };
  }

  return existingUser;
}

export async function PATCH(request: Request) {
  const body: Auth = await request.json();

  try {
    const foundUser = await findUser(body);

    const { _id, email, verify } = foundUser;

    if (verify) {
      throw { status: 409, error: 'Email вже підтверджено' };
    }

    const verificationToken = createVerifyJwt();

    const verificationBody = {
      verificationToken: verificationToken,
    };

    await User.findByIdAndUpdate(_id, verificationBody, {
      new: true,
    });

    try {
      await sendVerifyEmail(email, verificationToken);
    } catch (e: any) {
      throw { status: 500, error: 'Не вдалося надіслати лист' };
    }

    return NextResponse.json({ message: 'Token received' });
  } catch (e: any) {
    console.error(e);

    return NextResponse.json(
      { error: e.error || 'Invalid request' },
      { status: e.status || 400 }
    );
  }
}
