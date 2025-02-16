import { NextResponse } from 'next/server';

import { createJwt } from '@/helpers/auth/createJwt';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET as string;

export async function PATCH(request: Request) {
  const verifyToken = request.headers.get('Authorization')?.split(' ')[1];

  if (!verifyToken) {
    throw { status: 401, error: 'Токен не надано' };
  }

  try {
    await dbConnect();

    try {
      jwt.verify(verifyToken, jwtSecret);
    } catch (err: any) {
      if (err.name === 'TokenExpiredError') {
        throw { status: 401, error: 'Токен протермінований' };
      }
      throw { status: 401, error: 'Невірний токен' };
    }

    const editingUser = await User.findOne({ verificationToken: verifyToken });

    if (!editingUser) {
      throw { status: 404, error: 'Не знайдено' };
    }

    const { _id, role, name, phoneNumber, email, picture } = editingUser;

    const userInfo = { userId: _id, role: role };

    const token = createJwt(userInfo);

    const body = {
      verify: true,
      verificationToken: null,
    };

    await User.findByIdAndUpdate(_id, body, {
      new: true,
    });

    const user = {
      _id,
      picture,
      name,
      email,
      phoneNumber,
      role,
    };

    return NextResponse.json({ message: 'Token received', token, user });
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      { error: error.error || 'Invalid request' },
      { status: error.status || 400 }
    );
  }
}
