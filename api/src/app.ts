import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import userRouter from './routes/userRoutes';
import authRouter from './routes/authRoutes';
import postRouter from './routes/postRoutes';
import profileRouter from './routes/profileRoutes';
import { PORT, MONGO_URI } from './config/keys';
import { handleErrors } from './middlewares/handleErrors';
const app = express();

// CONNECT TO DB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log('Connected to database'))
  .catch((err) => console.log(err));

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

// MIDDLEWARES
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());

// ROUTES
app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/posts', postRouter);
app.use('/api/v1/profile', profileRouter);

//ERROR HANDLING
app.use(handleErrors);

// START SERVER
app.listen(PORT, () => {
  return console.log(`Server is up and running on PORT ${PORT}`);
});
