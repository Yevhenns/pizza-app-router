import User from '@/models/User';
import { TokenPayload } from 'google-auth-library';

import dbConnect from './dbConnect';

export async function createUserWithGoogle(
  payload: TokenPayload
): Promise<User> {
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
    verify: true,
    verificationToken: null,
  };

  const created = new User(newUser);
  await created.save();

  return created;
}
