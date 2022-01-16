import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import authRouter from './routes/authRoutes';
import userRouter from './routes/userRoutes';
import postRouter from './routes/postRoutes';
import profileRouter from './routes/profileRoutes';
import routes from './routes';
import { PORT } from './config/keys';
import { handleErrors } from './middlewares/handleErrors';
import path from 'path';
import connectDatabase from './config/database';
const app = express();

// CONNECT TO DB
connectDatabase();

// MIDDLEWARES
app.use(function (req, res, next) {
  res.setHeader(
    'Content-Security-Policy-Report-Only',
    "default-src 'self'; font-src 'self'; img-src * 'self' data: https:; script-src 'self' https://kit.fontawesome.com/5da4c9d314.js https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css; frame-src 'self';"
  );
  next();
});
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(fileUpload());

// ROUTES
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/profile', profileRouter);
app.use('/api/v1/posts', postRouter);
// app.use('/api/v1', routes);
// app.use('/:file', (req, res) => {
//   res.sendFile(`${__dirname}/public/uploads/${req.params.file}`);
// });

// PRODUCTION DEPLOYMENT
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client', 'build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client', 'build', 'index.html'));
  });
}

//ERROR HANDLING
app.use(handleErrors);

// START SERVER
app.listen(PORT, () => {
  return console.log(`Server is up and running on PORT ${PORT}`);
});
