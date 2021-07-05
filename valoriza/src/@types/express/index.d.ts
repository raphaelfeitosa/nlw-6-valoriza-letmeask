declare namespace Express {
  export interface Request {
    user_id: string;
    hostUrl: string;
    currentUrl: string;
  }
}
