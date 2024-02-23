import { Request } from "express";

export interface CustomReq<T> extends Request {
  body: T;
}
