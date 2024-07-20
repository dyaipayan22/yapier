import { findUserByEmail, findUserById } from '../repositories/userRepository';

export async function getUserById(id: string) {
  return await findUserById(id);
}
export async function getUserByEmail(email: string) {
  return await findUserByEmail(email);
}
