import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import userRouter from './src/routes/userRoutes';
import authRouter from './src/routes/authRoutes';
import postRouter from './src/routes/postRoutes';
import profileRouter from './src/routes/profileRoutes';
import { PORT, MONGO_URI } from './src/config/keys';
import { handleErrors } from './src/middlewares/handleErrors';
const app = express();

// CONNECT TO DB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log('Connected to database'))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

// MIDDLEWARES
app.use(express.static(`${__dirname}/public`));
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(fileUpload());

// ROUTES
app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/posts', postRouter);
app.use('/api/v1/profile', profileRouter);
app.use('/:file', (req, res) => {
  res.sendFile(`${__dirname}/public/uploads/${req.params.file}`);
});

//ERROR HANDLING
app.use(handleErrors);

// START SERVER
app.listen(PORT, () => {
  return console.log(`Server is up and running on PORT ${PORT}`);
});
