type user = {
  id: string;
};

declare namespace Express {
  export interface Request {
    user: user;
  }
}
