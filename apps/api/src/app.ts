import express, { Application } from 'express';
import cors from 'cors';
import authRouter from './routes/authRoutes';
import userRouter from './routes/userRoutes';
import actionRouter from './routes/actionRoutes';
import triggerRouter from './routes/triggerRoutes';
import zapRouter from './routes/zapRoutes';
import corsOptions from './lib/cors';

const app: Application = express();

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/zap', zapRouter);
app.use('/api/v1/trigger', triggerRouter);
app.use('/api/v1/action', actionRouter);

export default app;
