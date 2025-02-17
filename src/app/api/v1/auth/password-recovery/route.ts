import { NextResponse } from 'next/server';

import { hashPasswordFn } from '@/helpers/auth/hashPassword';
import dbConnect from '@/lib/dbConnect';
import { sendPasswordRecoveryEmail } from '@/lib/sendPasswordRecoveryEmail';
import User from '@/models/User';
import generator from 'generate-password';

export async function PATCH(request: Request) {
  const requestBody: { email: string } = await request.json();

  try {
    await dbConnect();

    const editingUser = await User.findOne({ email: requestBody.email });

    if (!editingUser) {
      throw { status: 404, error: 'Не знайдено' };
    }

    const { _id, email } = editingUser;

    const password = generator.generate({
      length: 8,
      numbers: true,
      strict: true,
    });

    const hashPassword = hashPasswordFn(password);

    const body = {
      password: hashPassword,
    };

    await sendPasswordRecoveryEmail(email, password);

    await User.findByIdAndUpdate(_id, body, {
      new: true,
    });

    return NextResponse.json({ message: 'Token received' });
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      { error: error.error || 'Invalid request' },
      { status: error.status || 400 }
    );
  }
}
