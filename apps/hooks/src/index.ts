import express from "express";
import prisma from "@repo/database";

const app = express();

app.use(express.json());

app.post("/hooks/catch/:userId/:zapId", async (req, res) => {
  const { zapId } = req.params;
  const metadata = req.body;

  try {
    await prisma.$transaction(async (tx) => {
      const run = await tx.zapRun.create({
        data: {
          zapId,
          metadata,
        },
      });
      console.log("Run", run);
      const outbox = await tx.zapRunOutbox.create({
        data: {
          zapRunId: run.id,
        },
      });
      console.log("Outbox", outbox);
    });

    res.json("Webhook received");
  } catch (error) {
    console.error("Transaction failed:", error);
    res.status(500).json("Transaction failed");
  }
});

app.listen(8001, () => console.log("Server is running on port 8001"));
