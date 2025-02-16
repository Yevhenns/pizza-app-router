import { NextResponse } from 'next/server';

import { createVerifyJwt } from '@/helpers/auth/createJwt';
import { createUserWithEmail } from '@/lib/createUserWithEmail';
import { sendVerifyEmail } from '@/lib/sendVerifyEmail';

export async function POST(request: Request) {
  const body: Auth = await request.json();

  const verificationToken = createVerifyJwt();

  try {
    const createdUser = await createUserWithEmail(body, verificationToken);

    const { email } = createdUser;

    try {
      await sendVerifyEmail(email, verificationToken);
    } catch (e: any) {
      throw { status: 500, error: 'Не вдалося надіслати лист' };
    }

    return NextResponse.json({
      message: 'success',
    });
  } catch (e: any) {
    console.error(e);

    return NextResponse.json(
      { error: e.error || 'Invalid request' },
      { status: e.status || 400 }
    );
  }
}
