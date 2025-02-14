import { NextResponse } from 'next/server';

import { sendConfirmEmail } from '@/helpers/sendConfirmEmail';
import { isValidEmail, isValidPassword } from '@/helpers/validation';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

const jwtSecret = process.env.JWT_SECRET as string;
const OWNER_EMAIL = process.env.OWNER_EMAIL as string;

async function createUser(
  payload: Auth,
  verificationToken: string
): Promise<User> {
  await dbConnect();

  if (!isValidPassword(payload.password) || !isValidEmail(payload.email)) {
    throw { status: 400, error: 'Невірний email або пароль' };
  }

  const existingUser: User | null = await User.findOne({
    email: payload.email,
  });

  if (existingUser) {
    throw { status: 409, error: 'Email вже використовується' };
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
    verificationToken,
    verify: false,
  };

  const created = new User(newUser);
  await created.save();

  return created;
}

export async function POST(request: Request) {
  const body: Auth = await request.json();

  try {
    const verificationToken = uuidv4();

    const createdUser = await createUser(body, verificationToken);

    const { _id, picture, name, email, phoneNumber, role } = createdUser;

    const tokenData = { userId: _id, role: role };

    const token = jwt.sign(tokenData, jwtSecret, { expiresIn: '1h' });

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
