import { NextResponse } from 'next/server';

import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import { OAuth2Client, TokenPayload } from 'google-auth-library';
import jwt from 'jsonwebtoken';

const clientId = process.env.CLIENTID;
const jwtSecret = process.env.JWT_SECRET as string;

if (!clientId) {
  throw new Error('Google Client ID is not defined in environment variables');
}

const client = new OAuth2Client(clientId);

async function createUser(payload: TokenPayload): Promise<User> {
  await dbConnect();

  const existingUser: User | null = await User.findOne({
    email: payload.email,
  });

  if (existingUser) {
    return existingUser;
  }

  const newUser: UserCreateDto = {
    picture: payload.picture || '',
    name: payload.name || '',
    email: payload.email || '',
    phoneNumber: '',
    password: '',
    role: 'Visitor',
  };

  const created = new User(newUser);
  await created.save();

  return created;
}

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

    const createdUser = await createUser(payload);

    const { _id, picture, name, email, phoneNumber, role } = createdUser;

    const userInfo = { userId: _id, role: role };

    const token = jwt.sign(userInfo, jwtSecret, { expiresIn: '7d' });

    const user = {
      _id,
      picture,
      name,
      email,
      phoneNumber,
      role,
    };

    return NextResponse.json({ message: 'Token received', token, user });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
