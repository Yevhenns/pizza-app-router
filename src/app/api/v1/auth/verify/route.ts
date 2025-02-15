import { NextResponse } from 'next/server';

import { createJwt } from '@/helpers/auth/createJwt';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

export async function PATCH(request: Request) {
  const verifyToken = request.headers.get('Authorization')?.split(' ')[1];

  if (!verifyToken) {
    throw { status: 401, error: 'Токен не надано' };
  }

  try {
    await dbConnect();

    const editingUser = await User.findOne({ verificationToken: verifyToken });
    console.log(editingUser);

    if (!editingUser) {
      throw { status: 404, error: 'Не знайдено' };
    }

    const { _id, role } = editingUser;

    const userInfo = { userId: _id, role: role };

    const token = createJwt(userInfo);
    console.log('token', token);

    const body = {
      verify: true,
      verificationToken: null,
    };

    const editedUser = await User.findByIdAndUpdate(_id, body, {
      new: true,
    });

    return NextResponse.json({ message: 'Token received', token, editedUser });
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      { error: error.error || 'Invalid request' },
      { status: error.status || 400 }
    );
  }
}
