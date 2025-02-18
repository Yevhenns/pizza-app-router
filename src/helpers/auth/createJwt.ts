import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

const jwtSecret = process.env.JWT_SECRET as string;

type createJwtProps = {
  userId: string;
  role: Role;
};

export function createJwt(userInfo: createJwtProps) {
  return jwt.sign(userInfo, jwtSecret, { expiresIn: '1h' });
}

export function createVerifyJwt() {
  return jwt.sign({ id: uuidv4() }, jwtSecret, { expiresIn: '15m' });
}
