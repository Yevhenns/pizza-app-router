type JwtPayloadCustom = {
  userId: string;
  role: Role;
};

type Auth = {
  email: string;
  password: string;
  repeatPassword?: string;
};

type AuthActions = 'login' | 'register' | 'recovery';
