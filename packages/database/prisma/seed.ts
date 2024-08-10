import prisma from "../src";

async function main() {
  await prisma.availableTriggers.create({
    data: {
      name: "Webhook",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIovxkR9l-OlwpjTXV1B4YNh0W_s618ijxAQ&s",
    },
  });

  await prisma.availableActions.create({
    data: {
      name: "Email",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4nd82eFk5SaBPRIeCpmwL7A4YSokA-kXSmw&s",
    },
  });
  await prisma.availableActions.create({
    data: {
      name: "Solana",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT10458YI0Lf1-Zx4fGwhWxI_x4oPCD034xaw&s",
    },
  });
}

main();
