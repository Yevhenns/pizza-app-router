import { NextResponse } from 'next/server';

import { createJwt } from '@/helpers/auth/createJwt';
import { createUserWithGoogle } from '@/lib/createUserWithGoogle';
import { OAuth2Client } from 'google-auth-library';

const clientId = process.env.CLIENTID;

if (!clientId) {
  throw new Error('Google Client ID is not defined in environment variables');
}

const client = new OAuth2Client(clientId);

export async function POST(request: Request) {
  try {
    const { googleToken } = await request.json();

    if (!googleToken) {
      return NextResponse.json(
        { error: 'Missing googleToken' },
        { status: 400 }
      );
    }

    const ticket = await client.verifyIdToken({
      idToken: googleToken,
      audience: clientId,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
    }

    const createdUser = await createUserWithGoogle(payload);

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

    return NextResponse.json({ message: 'Token received', token, user });
  } catch (e: any) {
    console.log(e);

    return NextResponse.json(
      { error: e.error || 'Invalid request' },
      { status: e.status || 400 }
    );
  }
}
