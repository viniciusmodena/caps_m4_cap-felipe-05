import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      userData: any;
      reqData: any;
      pagination: any;
    }
  }
}
