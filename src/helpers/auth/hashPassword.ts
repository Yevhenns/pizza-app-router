import bcrypt from 'bcrypt';

export function hashPasswordFn(payload: Auth) {
  return bcrypt.hashSync(payload.password, bcrypt.genSaltSync(10));
}
