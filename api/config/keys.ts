import dotenv from 'dotenv';
dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET.toString();
export const JWT_EXPIRES = process.env.JWT_EXPIRES.toString();
export const PORT = process.env.PORT.toString();
export const MONGO_URI = process.env.MONGO_URI.toString();
