import prisma from '@repo/db';

export async function findUserById(id: string) {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
}
export async function findUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
}
