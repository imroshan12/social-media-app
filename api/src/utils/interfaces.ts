import { Request } from 'express';
interface User {
  id: string;
}

export interface IGetUserAuthInfoRequest extends Request {
  user: User; // or any other type
}
