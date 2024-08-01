import express from 'express';
import prisma from '@repo/database';

const app = express();

app.use(express.json());

app.use('/hooks/catch/:userId/:zapId', async (req, res) => {
  const { userId, zapId } = req.params;
  const metadata = req.body;

  await prisma.$transaction(async (tx) => {
    const run = await tx.zapRun.create({
      data: {
        zapId,
        metadata,
      },
    });

    await tx.zapRunOutbox.create({
      data: {
        zapRunId: run.id,
      },
    });
  });

  res.json('Webhook received');
});

app.listen(8001, () => console.log('Server is running'));
