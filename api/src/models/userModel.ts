import { model, Schema, Document } from 'mongoose';
import validator from 'validator';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      unique: true,
      minlength: 3,
      maxlength: 30,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 8,
    },
    friends: [
      {
        user: {
          type: Schema.Types.ObjectId,
        },
      },
    ],
    pendingRequests: [
      {
        user: {
          type: Schema.Types.ObjectId,
        },
      },
    ],
    receivedRequests: [
      {
        user: {
          type: Schema.Types.ObjectId,
        },
      },
    ],
    avatar: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const User = model('User', userSchema);

export default User;
