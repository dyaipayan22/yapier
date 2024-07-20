import express from 'express';

const app = express();

app.use(express.json());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/zap', zapRouter);
app.use('/api/v1/trigger', triggerRouter);
app.use('/api/v1/action', actionRouter);

app.listen(8001, () => console.log('Server is running'));
