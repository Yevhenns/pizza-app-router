import bcrypt from 'bcrypt';

export function hashPasswordFn(password: string) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}
