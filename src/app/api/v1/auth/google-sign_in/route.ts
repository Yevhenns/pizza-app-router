import { NextResponse } from 'next/server';

import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';

const clientId = process.env.CLIENTID;
const jwtSecret = process.env.JWT_SECRET as string;

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
    console.log('payload', payload);

    const sub = { sub: payload.sub };
    const token = jwt.sign(sub, jwtSecret, { expiresIn: '7d' });

    console.log('Generated JWT:', token);

    return NextResponse.json({ message: 'Token received', token });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
