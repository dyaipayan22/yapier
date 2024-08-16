import { PrismaClient } from "@prisma/client";
export { type JsonObject } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();

export default prisma;
