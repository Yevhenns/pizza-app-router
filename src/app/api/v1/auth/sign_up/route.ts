import { NextResponse } from 'next/server';

import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET as string;

async function createUser(payload: Auth): Promise<User> {
  await dbConnect();

  const existingUser: User | null = await User.findOne({
    email: payload.email,
  });

  if (existingUser) {
    return existingUser;
  }

  const hashPassword = bcrypt.hashSync(
    payload.password,
    bcrypt.genSaltSync(10)
  );

  const newUser: UserCreateDto = {
    picture:
      'https://res.cloudinary.com/dyka4vajb/image/upload/f_auto,q_auto/v1/hatamagnata/other/qnzdjcor4opcy0kpkb4o',
    name: 'Гість',
    email: payload.email || '',
    phoneNumber: '',
    password: hashPassword,
    role: 'Visitor',
  };

  const created = new User(newUser);
  await created.save();

  return created;
}

export async function POST(request: Request) {
  const body: Auth = await request.json();

  try {
    const createdUser = await createUser(body);

    const { _id, picture, name, email, phoneNumber, role } = createdUser;

    const tokenData = { userId: _id, role: role };

    const token = jwt.sign(tokenData, jwtSecret, { expiresIn: '7d' });

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
