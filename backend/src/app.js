import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import corsOptions from './config/corsConfig.js';
import { globalErrorHandler } from './middlewares/globalErrorHandler.middleware.js';
import { CustomError } from './utils/CustomError.js';
import helmet from 'helmet';

const app = express();

// Global Middleware
app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));
app.use(cookieParser());

// Route Imports
import userRouter from './routes/user.routes.js';
import todoRouter from './routes/todo.routes.js';

// routes declaration
app.use('/api/v1/users', userRouter);
app.use('/api/v1/todos', todoRouter);

// Unknown Endpoint Handler
app.all('*', (req, res, next) => {
  const err = new CustomError(404, `Can't find ${req.originalUrl} on the server!`);
  next(err);
});

// Global Error Handler
app.use(globalErrorHandler);

export { app };
