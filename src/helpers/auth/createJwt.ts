import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET as string;

type createJwtProps = {
  userId: string;
  role: Role;
};

export function createJwt(userInfo: createJwtProps) {
  return jwt.sign(userInfo, jwtSecret, { expiresIn: '1h' });
}
