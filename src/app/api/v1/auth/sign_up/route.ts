import { NextResponse } from 'next/server';

import { createJwt } from '@/helpers/auth/createJwt';
import { sendConfirmEmail } from '@/helpers/auth/sendConfirmEmail';
import { verificationToken } from '@/helpers/auth/verificationToken';
import { createUserWithEmail } from '@/lib/createUserWithEmail';

const OWNER_EMAIL = process.env.OWNER_EMAIL as string;

export async function POST(request: Request) {
  const body: Auth = await request.json();

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

    const mail = {
      to: email,
      subject: 'Verify email',
      from: OWNER_EMAIL,
      html: `<a href="http://localhost:3000/api/users/verify/${verificationToken}" target="_blank">Verify email</a>`,
    };
    await sendConfirmEmail(mail);

    return NextResponse.json({ message: 'Token received', token, user });
  } catch (e: any) {
    console.error(e);

    return NextResponse.json(
      { error: e.error || 'Invalid request' },
      { status: e.status || 400 }
    );
  }
}
