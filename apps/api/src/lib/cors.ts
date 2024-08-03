import { CorsOptions } from 'cors';

const allowedOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173'];

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },

  credentials: true,
  optionsSuccessStatus: 200,
};

export default corsOptions;
