import { JwtPayload } from "jsonwebtoken";

export interface JwtUserPayload extends JwtPayload {
  _id: string;
  email: string;
  username: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtUserPayload;
    }
  }
}

export {};
