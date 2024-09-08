import { User } from 'firebase/auth';

export type AuthResponseType =
  | {
      user: User;
      error: null;
    }
  | {
      user: null;
      error: {
        statusCode: number;
        message: string;
      };
    };
