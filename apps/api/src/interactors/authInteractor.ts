import { SignInInput } from '@repo/schema';
import { generateTokens } from '../utils/generateTokens';
import { getUserByEmail } from '../repositories/userRepository';

export async function signIn(signInData: SignInInput) {
  const existingUser = await getUserByEmail(signInData.email);
  if (!existingUser) {
    throw new Error('User not found');
  }
  const { accessToken, refreshToken } = generateTokens(existingUser.id);
  return { accessToken, refreshToken };
}

export async function signOut(): Promise<void> {
  throw new Error('Method not implemented.');
}
