import { CreateUserInput } from '@repo/schema';
import {
  createUser,
  getUserByEmail,
  getUserById,
} from '../repositories/userRepository';

export async function registerUser(registerUserInput: CreateUserInput) {
  return await createUser(registerUserInput);
}

export async function findUserById(id: string) {
  const user = await getUserById(id);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
}

export async function findUserByEmail(email: string) {
  const user = await getUserByEmail(email);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
}
