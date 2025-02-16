import { hashPasswordFn } from '@/helpers/auth/hashPassword';
import { isValidEmail, isValidPassword } from '@/helpers/validation';
import User from '@/models/User';

import dbConnect from './dbConnect';

export async function createUserWithEmail(
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

  const hashPassword = hashPasswordFn(payload.password);

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
