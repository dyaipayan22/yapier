import express, { Application } from 'express';
import authRouter from './routes/authRoutes';

const app: Application = express();

app.use(express.json());

app.use('/api/v1/auth', authRouter);
// app.use('/api/v1/user', userRouter);
// app.use('/api/v1/zap', zapRouter);
// app.use('/api/v1/trigger', triggerRouter);
// app.use('/api/v1/action', actionRouter);

export default app;
