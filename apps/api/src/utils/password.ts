import bcrypt from 'bcryptjs';

export async function hashPassword(password: string) {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  return hashedPassword;
}

export async function matchPassword(password: string, hashedPassword: string) {
  return bcrypt.compareSync(password, hashedPassword);
}
