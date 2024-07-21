import prisma from '@repo/db';
import { CreateUserInput } from '@repo/schema';

export async function createUser(createUserData: CreateUserInput) {
  return await prisma.user.create({
    data: createUserData,
  });
}

export async function getUserById(id: string) {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
}

export async function getUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
}
