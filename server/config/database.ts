import mongoose from 'mongoose';
import { MONGO_URI } from './keys';

const connectDatabase = (): void => {
  mongoose
    .connect(MONGO_URI)
    .then(() => console.log('Connected to database'))
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
};

export default connectDatabase;
