import prisma from "../src";

async function main() {
  await prisma.availableTriggers.create({
    data: {
      name: "Webhook",
      image: "",
    },
  });

  await prisma.availableActions.create({
    data: {
      name: "Email",
      image: "",
    },
  });
  await prisma.availableActions.create({
    data: {
      name: "Solana",
      image: "",
    },
  });
}

main();
