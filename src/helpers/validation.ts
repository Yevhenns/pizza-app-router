export function isValidEmail(email: string): boolean {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}

export function isValidPassword(password: string): boolean {
  return /^(?=.*[a-zA-Zа-яА-Я])(?=.*\d).{8,}$/.test(password);
}
