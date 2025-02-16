import { NextResponse } from 'next/server';

import { createJwt } from '@/helpers/auth/createJwt';
import { isValidEmail, isValidPassword } from '@/helpers/validation';
import dbConnect from '@/lib/dbConnect';
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

export async function POST(request: Request) {
  const body: Auth = await request.json();

  try {
    const foundUser = await findUser(body);

    const { _id, picture, name, email, phoneNumber, role, verify } = foundUser;

    if (!verify) {
      throw { status: 403, error: 'Email не підтверджено' };
    }

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

    return NextResponse.json({ message: 'Token received', token, user });
  } catch (e: any) {
    console.error(e);

    return NextResponse.json(
      { error: e.error || 'Invalid request' },
      { status: e.status || 400 }
    );
  }
}
